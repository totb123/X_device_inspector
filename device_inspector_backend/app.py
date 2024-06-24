from datetime import datetime
import json
from typing import List, Optional, Annotated
import aiofiles

import uvicorn as uvicorn
from fastapi import FastAPI, Query, Request, File, UploadFile, Response
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import src.database.db as db
from config import AppConfig
import src.schemas as schemas
from src.schemas import InspectionsFilter
from src.services.get_all_sectors import get_all_sectors
from src.services.get_inspections import get_inspections
from src.services.get_coordinates import get_coordinates
from src.services.update_inspections import update_inspections
import os

app = FastAPI()

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


@app.get('/inspections')
async def get_inspections_endpoint(
        sector_ids: List[int] = Query(None),
        multi_board_ids: List[int] = Query(None),
        datamatrices: List[str] = Query(None),
        start_date: datetime | None = None,
        end_date: datetime | None = None,
        skip: int | None = None,
        limit: int | None = None
) -> List[schemas.Inspection]:
    filters = InspectionsFilter(
        sector_ids=sector_ids,
        multi_board_ids=multi_board_ids,
        start_date=start_date,
        datamatrices=datamatrices,
        end_date=end_date,
        skip=skip,
        limit=limit
    )
    return get_inspections(filters, db.get_inspections_by_criteria(start_date, end_date, multi_board_ids, sector_ids,
                                                                datamatrices))


@app.get('/inspections/count')
async def get_inspections_count(
    sector_ids: List[int] = Query(None),
        multi_board_ids: List[int] = Query(None),
        datamatrices: List[str] = Query(None),
        start_date: datetime | None = None,
        end_date: datetime | None = None,
        skip: int | None = None,
        limit: int | None = None
    ):
    filters = InspectionsFilter(
        sector_ids=sector_ids,
        multi_board_ids=multi_board_ids,
        start_date=start_date,
        datamatrices=datamatrices,
        end_date=end_date,
    )
    return len(get_inspections(
        filters, db.get_inspections_by_criteria(
            start_date, end_date, multi_board_ids, sector_ids,datamatrices
            )
        ))

@app.get('/boards')
async def get_boards_by_multiboard(multiboard_id: int): 
    return db.get_boards_by_multiboard_id(multiboard_id=multiboard_id)

@app.get('/change_coordinates')
async def change_coordinates_endpoint(sector_id: int, side: str, coordinates: List[str] = Query(None)) -> int:
    return db.change_dm_coordinates(sector_id, side, coordinates[0], coordinates[1], coordinates[2], coordinates[3],
                       coordinates[4], coordinates[5], coordinates[6], coordinates[7])
    

@app.get('/get_coordinates')
async def get_coordinaes_endpoint(sector_id: int, side: str) -> schemas.SectorDMCoordinates: 
    return get_coordinates(sector_id, side)

@app.get('/get_status')
async def get_status_endpoint(datamatrix: str):
    res = db.get_status_by_dm(datamatrix)
    return res


# статус бордов
@app.post('/change_status')
async def change_status_endpoint(datamatrix: str, new_status: str) -> bool:
    res = db.change_status_by_dm(datamatrix, new_status)
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
    # file_path = f"D:/PycharmProjects/device_inspector-master/device_inspector_backend/static/{path}"
    # print(file_path)
    file_path = f"{os.environ.get('FILE_PATH', './static')}/{path}"
    if os.path.exists(file_path):
        with open (file_path, 'rb') as file:
            image = file.read()
        return Response(content=image, media_type='image/jpeg')

    else: 
        return {'error': 'File not found'}


if __name__ == '__main__':
    uvicorn.run(app, host=AppConfig.host, port=AppConfig.port)
