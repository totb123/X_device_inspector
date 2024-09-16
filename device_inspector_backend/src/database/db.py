from sqlalchemy import create_engine, and_, update, or_, func
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime
from src.database import models
from src.services.determine_reading_order import determine_reading_order
from src import schemas
import os

SQLALCHEMY_DATABASE_URL = os.environ.get('DATABASE_URL',
                                         'postgresql://postgres:postgres@localhost:5432/device_inspector_1')


def get_boards_by_multiboard_id(multiboard_id):
    db = get_connection()
    query = db.query(models.Board).filter_by(multiboard_id=multiboard_id).order_by(models.Board.id).all()
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
        datamatrices: list[str] | None = None,
        status: list[str] | None = None,
        parties:  list[str] | None = None
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
    if status:
        query = query.filter(models.Inspection.status.in_(status))
    if parties:
        filters = [models.Board.datamatrix.like('_' + p + '%') for p in parties]

        # Объедините условия с помощью or_ для создания одного запроса
        found_multiboards = db.query(models.Board.multiboard_id).filter(or_(*filters)).all()
        query = query.filter(models.Inspection.multiboard_id.in_([item[0] for item in found_multiboards]))
    res = []
    inspections = query.all()
    for element in inspections:
        res.append(schemas.Inspection(**element.__dict__))

    db.close()
    return sorted(res, key=lambda x: x.time, reverse=True)


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


def get_last_inspection(sector_id: int, side: str, multiboard_ids: list[int]) -> models.Inspection: 
    db = get_connection()
    return db.query(models.Inspection).filter(
        models.Inspection.side == side.lower(), 
        models.Inspection.sector_id == sector_id,
        models.Inspection.multiboard_id.in_(multiboard_ids),
    ).order_by(models.Inspection.id.desc()).first()

def get_reversed_inspections_by_sector_id(sector_id: int) -> list[models.Inspection]:
    db = get_connection()
    inspections = db.query(models.Inspection).filter(
        models.Inspection.sector_id == sector_id,
    ).order_by(models.Inspection.id.desc()).all()
    db.close()
    return inspections
def get_multiboard_ids_by_specification(specification_id: int) -> list[int]: 
    db = get_connection()
    multiboards = db.query(models.Multiboard).filter(
        models.Multiboard.specification_id == specification_id,
    ).all()
    db.close()
    return list(map(lambda multiboard: multiboard.id, multiboards))


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
        query_change = db.query(models.Inspection).filter_by(id=inspection_id).update(
            {models.Inspection.status: new_status})
        db.commit()
        db.close()
    if query_change:
        return True
    else:
        return False


def get_comments_by_datamatrix(board_datamatrix: int):
    db = get_connection()
    multiboard_id = db.query(models.Board).filter_by(
        datamatrix=board_datamatrix
    ).first().multiboard_id
    return multiboard_id


def get_comments_by_inspection(inspection_id: int):
    db = get_connection()
    inspection = db.query(models.Comment).filter_by(inspections_id=inspection_id).all()
    return [schemas.Comment(text=element.text, id=element.id) for element in inspection]


def add_comment(inspection_id: int, comment: schemas.CommentCreate):
    db = get_connection()
    new_comment = models.Comment(inspections_id=inspection_id, text=comment.text)
    db.add(new_comment)
    db.commit()
    return True


def get_sector_db() -> list[schemas.Sector]:
    db = get_connection()
    db_sectors = db.query(models.Sector).all()
    sectors = [schemas.Sector(**(element.__dict__)) for element in db_sectors]
    return sectors

def get_all_statuses_db() -> list[str]:
    db = get_connection()
    return db.query(models.Inspection.status).distinct().all()
    
# def get_dm_coordinates(sector_id, side) -> models.SectorsDMPosition:
#     db = get_connection()
#     return db.query(models.SectorsDMPosition).filter(
#         models.SectorsDMPosition.side == side.lower(),
#         models.SectorsDMPosition.id_sector == sector_id
#     ).first()


# настройка позиций датаматриксов для каждого сектора
# def change_dm_coordinates(sector_id, side, coordinates_1, coordinates_2, coordinates_3, coordinates_4, coordinates_5,
#                           coordinates_6, coordinates_7, coordinates_8):
#     db = get_connection()
#     query = db.query(models.SectorsDMPosition).filter(models.SectorsDMPosition.side == side.lower(),
#                                                       models.SectorsDMPosition.id_sector == sector_id)


def get_specifications_db() -> list[schemas.Sector]:
    db = get_connection()
    db_specifications = db.query(models.Specification).all()
    specifications = [schemas.Specification(**(element.__dict__)) for element in db_specifications]
    return specifications


def get_dm_coordinates(sector_id, side, specification_id) -> models.SectorsDMPosition: 
    db = get_connection()
    return db.query(models.SectorsDMPosition).filter(
        models.SectorsDMPosition.side == side.lower(), 
        models.SectorsDMPosition.id_sector == sector_id,
        models.SectorsDMPosition.specification_id == specification_id,
    ).first()
    

def change_dm_coordinates(sector_id, specification_id, side, coordinates_1, coordinates_2, coordinates_3, coordinates_4, coordinates_5,
                       coordinates_6, coordinates_7, coordinates_8):
    db = get_connection()
    query = db.query(models.SectorsDMPosition).filter(
        models.SectorsDMPosition.side == side.lower(), 
        models.SectorsDMPosition.id_sector == sector_id,
        models.SectorsDMPosition.specification_id == specification_id,
        )
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


def change_controversial_data(inspection_id, defective_flag):
    db = get_connection()

    inspection = db.query(models.Inspection).filter_by(id=inspection_id).first()
    boards = db.query(models.Board).filter_by(multiboard_id=inspection.multiboard_id).order_by(models.Board.id).all()

    defect_dm_list = [board.datamatrix for board in boards[:8]]
    defect_board_list = [{'id': board.id, 'multiboard_id': board.multiboard_id,
                          'datamatrix': board.datamatrix, 'defect_type': board.defect_type} for board in boards[:8]]
    dm_list_not_zer = [board.datamatrix for board in boards[:8] if board.datamatrix != '0']
    valid_multiboard = db.query(models.Board.multiboard_id).filter(models.Board.datamatrix.in_(dm_list_not_zer),
                                                                   ~models.Board.defect_type.any(4)).first()

    valid_boards = db.query(models.Board).filter(models.Board.multiboard_id == valid_multiboard[0]
                                                 ).order_by(models.Board.id).all()

    board_list_without_defect = [{'id': board.id, 'multiboard_id': board.multiboard_id,
                                  'datamatrix': board.datamatrix, 'defect_type': board.defect_type} for board in
                                 valid_boards]
    dm_list_without_defect = [board.datamatrix for board in valid_boards]
    if not defective_flag:
        reading_order = determine_reading_order(dm_list_without_defect, defect_dm_list)  # ошибка реверса
        change_controversial_boards(board_list_without_defect, defect_board_list, reading_order, db)
    update_controversial_inspection(inspection_id, valid_boards[0].multiboard_id, defective_flag, db)
    if not defective_flag:
        delete_multiboard(defect_board_list[0]['multiboard_id'], db)



def change_controversial_boards(board_list_without_defect, defect_board_list, reading_order, db):
    count_boards = len(board_list_without_defect)
    for i in range(count_boards):
        index = i if reading_order else count_boards - i - 1
        if board_list_without_defect[index]['datamatrix'] == '0' and defect_board_list[index]['datamatrix'] != '0':
            update_dm = update(models.Board).where(models.Board.id == board_list_without_defect[index]['id']).values(
                datamatrix=defect_board_list[index]['datamatrix'])
            db.execute(update_dm)
            current_defect_type = board_list_without_defect[index]['defect_type']
            current_defect_type.remove(5)
            update_defect_type = update(models.Board).where(
                models.Board.id == board_list_without_defect[index]['id']).values(
                defect_type=current_defect_type)
            db.execute(update_defect_type)

    db.commit()
    for board in defect_board_list:
        board_to_delete = db.query(models.Board).filter_by(id=board['id']).first()
        if board_to_delete:
            db.delete(board_to_delete)

    return True


def delete_multiboard(multiboard_id, db):
    multiboard_to_delete = db.query(models.Multiboard).filter_by(id=multiboard_id).first()
    if multiboard_to_delete:
        db.delete(multiboard_to_delete)
        db.commit()


def update_controversial_inspection(inspection_id, new_multiboard_id, defective_flag, db):
    update_data = {
        models.Inspection.status: 'DEFECTIVE' if defective_flag else 'UNCHECKED',
        models.Inspection.multiboard_id: None if defective_flag else new_multiboard_id
    }
    db.query(models.Inspection).filter_by(id=inspection_id).update(
        {k: v for k, v in update_data.items() if v is not None})
    db.commit()


def edit_dms(dto: schemas.EditDMsInput):
    db = get_connection()
    for index, board_id in enumerate(dto.board_ids):
        query = db.query(models.Board).filter(
            models.Board.id == board_id
            )
        query.update({
            models.Board.datamatrix: dto.dms[index],
        }, synchronize_session=False)
    db.commit()
    db.close()
    return True


def get_current_party(): 
    db = get_connection()
    return db.query(models.CurrentParty).first()


def update_current_party(specification_id: int, side: str):
    db = get_connection()
    query = db.query(models.CurrentParty)
    query.update({
            models.CurrentParty.specification_id: specification_id,
            models.CurrentParty.side: side.lower(),
        }, synchronize_session=False)
    db.commit()
    db.close()
    return True


def get_connection():
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    ss = sessionmaker(bind=engine)
    session = ss()
    return session
