from datetime import datetime
from typing import List
import uvicorn as uvicorn
from fastapi import FastAPI, Query, File, UploadFile, Response
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from config import AppConfig
import src.database.db as db
import src.schemas as schemas
from src.schemas import InspectionsFilter
from src.services.get_all_sectors import get_all_sectors
from src.services.get_inspections import get_inspections
from src.services.get_all_inspections_statuses import get_all_inspection_statuses
from src.services.get_coordinates import get_coordinates
from src.services.update_inspections import update_inspections
from src.services.get_image import get_image_from_zip_service
import os

from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_cache.decorator import cache

from redis import asyncio as aioredis

from datetime import datetime, timedelta, time
import os
from src.database.db import get_inspections_by_criteria
from src.database.iminio import MinIORepository


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    redis = aioredis.from_url("redis://localhost")
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")
    yield


app = FastAPI(lifespan=lifespan)

origins = [
    'http://localhost:9090',
    'http://localhost:9090/sectors'
    'http://localhost:3000'
]

app.add_middleware(CORSMiddleware,
                   allow_origins='*',
                   allow_credentials=True,
                   allow_methods="*",
                   allow_headers="*"
                   )

# @app.middleware('http')
# async def log_params(request: Request, call_next): 
#     print(request.query_params.multi_items())
#     response = await call_next(request)
#     return response

app.mount(path='/static/', app=StaticFiles(directory=os.environ.get('FILE_PATH', './static')), name="static")


@app.get('/sectors')
async def get_all_sectors_endpoint() -> List[schemas.Sector]:
    return get_all_sectors()


@app.get('/specifications')
async def get_all_specifications_endpoint() -> List[schemas.Specification]:
    return db.get_specifications_db()


@app.get('/inspections') # заменить party на parties
async def get_inspections_endpoint(
        sector_ids: List[int] = Query(None),
        multi_board_ids: List[int] = Query(None),
        datamatrices: List[str] = Query(None),
        start_date: datetime | None = None,
        end_date: datetime | None = None,
        status: List[str] = Query(None),
        parties: List[str] = Query(None),
        skip: int | None = None,
        limit: int | None = None
) -> List[schemas.Inspection]:
    filters = InspectionsFilter(
        sector_ids=sector_ids,
        multi_board_ids=multi_board_ids,
        start_date=start_date,
        datamatrices=datamatrices,
        end_date=end_date,
        status=status,
        parties=parties,
        skip=skip,
        limit=limit
    )
    print(sector_ids,parties,start_date,end_date,datamatrices)
    return get_inspections(filters, db.get_inspections_by_criteria(start_date, end_date, multi_board_ids, sector_ids,
                                                                datamatrices, status, parties))


@app.get('/inspections/count')
async def get_inspections_count(
        sector_ids: List[int] = Query(None),
        multi_board_ids: List[int] = Query(None),
        datamatrices: List[str] = Query(None),
        start_date: datetime | None = None,
        end_date: datetime | None = None,
        status: List[str] = Query(None),
        parties: List[str] = Query(None),
    ):
    filters = InspectionsFilter(
        sector_ids=sector_ids,
        multi_board_ids=multi_board_ids,
        start_date=start_date,
        datamatrices=datamatrices,
        end_date=end_date,
        status=status,
        parties=parties,
    )
    return len(get_inspections(
        filters, db.get_inspections_by_criteria(
            start_date, end_date, multi_board_ids, sector_ids, datamatrices, status, parties
            )
        ))

@app.get('/boards')
async def get_boards_by_multiboard(multiboard_id: int):
    return db.get_boards_by_multiboard_id(multiboard_id=multiboard_id)

@app.get('/change_coordinates')
async def change_coordinates_endpoint(sector_id: int, specification_id: int, side: str, coordinates: List[str] = Query(None)) -> int:
    return db.change_dm_coordinates(sector_id, specification_id, side, coordinates[0], coordinates[1], coordinates[2], coordinates[3],
                       coordinates[4], coordinates[5], coordinates[6], coordinates[7])
    


@app.get('/get_coordinates')
async def get_coordinaes_endpoint(sector_id: int, side: str, specification: int) -> schemas.SectorDMCoordinates: 
    return get_coordinates(sector_id, side, specification)

@app.get('/statuses')
async def get_all_statuses_endpoint() -> List[str]:
    return get_all_inspection_statuses()


@app.get('/get_status')
async def get_status_endpoint(inspection_id: int):
    res = db.get_status_by_dm(inspection_id)
    return res


# статус бордов
@app.post('/change_status')
async def change_status_endpoint(inspection_id: str, new_status: str) -> bool:
    res = db.change_status_by_dm(inspection_id, new_status)
    return res


@app.get('/comment')
async def get_comments_for_boards(inspection_id: str):
    return db.get_comments_by_inspection(int(inspection_id))


@app.post('/comment')
async def add_comment_endpoint(inspection_id: int, comment: schemas.CommentCreate):
    return db.add_comment(inspection_id, comment)


@app.post('/upload_image')
async def upload_file(inspection_id: int, file: UploadFile = File(...)):
    return await update_inspections(image=file, inspection_id=inspection_id)


@app.get('/get_image')
async def get_image(path: str):
    file_path = f"{os.environ.get('FILE_PATH', './static')}/{path}"
    if os.path.exists(file_path):
        with open (file_path, 'rb') as file:
            image = file.read()
        return Response(content=image, media_type='image/jpeg')
    else: 
        return {'error': 'File not found'}
    

@app.get('/get_minio_image')
async def get_minio_image(path: str):
    image = get_image_from_zip_service(path)
    return Response(content=image, media_type='image/jpeg')
    

@app.get('/get_last_image')
async def get_last_image(sector_id: int, side: str | None = None, specification_id: int | None = None):
    # todo: знаю, что решение далеко не лучшее, пока что ничего не пришло в голову
    reversed_inspections = db.get_reversed_inspections_by_sector_id(sector_id)
    if side is None or specification_id is None:
        inspection = reversed_inspections[0] 
        return {
            'image_path': inspection.url_image,
            'created_at': inspection.time
            }
    else: 
        multiboard_ids = db.get_multiboard_ids_by_specification(specification_id)
        inspection = db.get_last_inspection(sector_id, side, multiboard_ids)
    file_path = f"{os.environ.get('FILE_PATH', './static')}/{inspection.url_image}"
    print(file_path)
    if os.path.exists(file_path):
        with open(file_path, 'rb') as file:
            image = file.read()
        return Response(content=image, media_type='image/jpeg')
    else: 
        return {'error': 'File not found'}
    
@app.post('/edit_dms')
async def edit_dms(dto: schemas.EditDMsInput):
    return db.edit_dms(dto)


@app.get('/get_current_party')
async def get_current_party():
    return db.get_current_party()


@app.post('/update_current_party')
async def update_current_party(specification_id: int, side: str):
    return db.update_current_party(specification_id, side)


@app.get('/change_controversial_status')
async def change_controversial_status(inspection_id: str, confirmation_flag: bool):

    return db.change_controversial_data(int(inspection_id), confirmation_flag)


if __name__ == '__main__':
    uvicorn.run(app, host=AppConfig.host, port=AppConfig.port)
