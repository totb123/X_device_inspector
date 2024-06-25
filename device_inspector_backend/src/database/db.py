from sqlalchemy import create_engine, func
from sqlalchemy.orm import sessionmaker
from sqlalchemy import desc
from datetime import datetime
from src.database import models
from src import schemas
import os

SQLALCHEMY_DATABASE_URL = os.environ.get('DATABASE_URL', 'postgresql://postgres:12345@localhost:5432/device_inspector_1')

def get_boards_by_multiboard_id(multiboard_id):
    db = get_connection()
    query = db.query(models.Board).filter_by(multiboard_id=multiboard_id).all()        
    boards = [schemas.Board(**element.__dict__) for element in query]
    db.close()
    return boards


def get_boards_by_dm(dms):
    db = get_connection()
    res = []
    for dm in dms:
        query = db.query(models.Board).filter_by(datamatrix=dm).all()
        res.append(query)
    db.close()
    return res


def get_inspections_by_criteria(
        start_time: datetime | None = None, 
        end_time: datetime | None = None, 
        multiboard_id: list[int] | None = None, 
        sector_ids: list[int] | None = None, 
        datamatrices: list[str] | None= None
    ):
    db = get_connection()
    query = db.query(models.Inspection)
    if start_time:
        query = query.filter(models.Inspection.time >= start_time)
    if end_time:
        query = query.filter(models.Inspection.time <= end_time)
    if multiboard_id:
        query = query.filter(models.Inspection.multiboard_id.in_(multiboard_id))
    if sector_ids:
        query = query.filter(models.Inspection.sector_id.in_(sector_ids))
    if datamatrices:
        found_multiboards = db.query(models.Board.multiboard_id).filter(models.Board.datamatrix.in_(datamatrices)).all()
        query = query.filter(models.Inspection.multiboard_id.in_([item[0] for item in found_multiboards]))
    res = []
    inspections = query.all()
    for element in inspections:
        res.append(schemas.Inspection(**element.__dict__))

    db.close()
    return sorted(res,key=lambda x: x.time, reverse=True)

def add_inspection_image(inspection_id: int, image_path: str):
    try:
        db = get_connection()
        db_inspection = db.query(models.Inspection).filter(models.Inspection.id == inspection_id)
        db_inspection.update({models.Inspection.url_image: image_path})
        db.commit()
        db.close()
        return True
    except: 
        return False

def get_status_by_dm(inspection_id):
    db = get_connection()
    res = ''
    query = db.query(models.Inspection.status).filter_by(id=inspection_id).first()
    if query:
        res = query[0]
    db.close()
    return res


def change_status_by_dm(inspection_id, new_status):
    db = get_connection()
    query_m = db.query(models.Inspection).filter_by(id=inspection_id).first()
    query_change = None
    if query_m:
        query_change = db.query(models.Inspection).filter_by(id=inspection_id).update({models.Inspection.status: new_status})
        db.commit()
        db.close()
    if query_change:
        return True
    else:
        return False

def get_comments_by_datamatrix(board_datamatrix: int): 
    db = get_connection()
    multiboard_id = db.query(models.Board).filter_by(datamatrix = board_datamatrix).first().multiboard_id

    return multiboard_id

def get_comments_by_inspection(inspection_id: int):
    db = get_connection()
    inspection = db.query(models.Inspection).filter_by(id = inspection_id).first()
    return [schemas.Comment(text=element.text, id=element.id) for element in inspection.comments]

def add_comment(inspection_id: int, comment: schemas.CommentCreate):
    db = get_connection()
    inspection = db.query(models.Inspection).filter_by(id = inspection_id).first()

    last_id = db.query(func.max(models.Comment.id)).scalar()
    inspection.comments.append(models.Comment(id = last_id+1, text=comment.text))

    db.commit()
    db.refresh(inspection)
    return schemas.Inspection(**(inspection.__dict__))

def get_sector_db() -> list[schemas.Sector]:
    db = get_connection()
    db_sectors = db.query(models.Sector).all()
    sectors = [schemas.Sector(**(element.__dict__)) for element in db_sectors]
    return sectors

def get_dm_coordinates(sector_id, side) -> models.SectorsDMPosition: 
    db = get_connection()
    return db.query(models.SectorsDMPosition).filter(
        models.SectorsDMPosition.side == side.lower(), 
        models.SectorsDMPosition.id_sector == sector_id
    ).first()
    
# настройка позиций датаматриксов для каждого сектора
def change_dm_coordinates(sector_id, side, coordinates_1, coordinates_2, coordinates_3, coordinates_4, coordinates_5,
                       coordinates_6, coordinates_7, coordinates_8):
    db = get_connection()
    query = db.query(models.SectorsDMPosition).filter(models.SectorsDMPosition.side == side.lower(), models.SectorsDMPosition.id_sector == sector_id)
    count = query.update({
        models.SectorsDMPosition.coordinates_1: coordinates_1,
        models.SectorsDMPosition.coordinates_2: coordinates_2,
        models.SectorsDMPosition.coordinates_3: coordinates_3,
        models.SectorsDMPosition.coordinates_4: coordinates_4,
        models.SectorsDMPosition.coordinates_5: coordinates_5,
        models.SectorsDMPosition.coordinates_6: coordinates_6,
        models.SectorsDMPosition.coordinates_7: coordinates_7,
        models.SectorsDMPosition.coordinates_8: coordinates_8
    }, synchronize_session=False)
    db.commit()
    db.close()
    return count
    # добавить ретерн


def get_connection():
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    ss = sessionmaker(bind=engine)
    session = ss()
    return session
