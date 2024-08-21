from src.database.db_init import SQLALCHEMY_DATABASE_URL
from sqlalchemy.orm import sessionmaker
from src.database.models import SectorsDMPosition, Multiboard, Board, Inspection, Sector, CurrentParty, Specification
from sqlalchemy import create_engine, update, not_
import psycopg2


def get_dm_position(sector_id, current_specification):
    db = get_connection()
    results = db.query(SectorsDMPosition).filter(
        SectorsDMPosition.id_sector == sector_id,
        SectorsDMPosition.specification_id == current_specification.specification_id
    ).all()
    for result in results:
        if result.side == "top":
            top_dict = {'side': result.side,
                        'coordinate_1': result.coordinates_1,
                        'coordinate_2': result.coordinates_2,
                        'coordinate_3': result.coordinates_3, 'coordinate_4': result.coordinates_4,
                        'coordinate_5': result.coordinates_5, 'coordinate_6': result.coordinates_6,
                        'coordinate_7': result.coordinates_7,
                        'coordinate_8': result.coordinates_8}
        else:
            bot_dict = {'side': result.side,
                        'coordinate_1': result.coordinates_1,
                        'coordinate_2': result.coordinates_2,
                        'coordinate_3': result.coordinates_3, 'coordinate_4': result.coordinates_4,
                        'coordinate_5': result.coordinates_5, 'coordinate_6': result.coordinates_6,
                        'coordinate_7': result.coordinates_7, 'coordinate_8': result.coordinates_8}
    return top_dict, bot_dict


def get_current_specification(db):
    current_specification = db.query(CurrentParty).first()
    return current_specification

# def add_boards(data, side, multiboard_id, db, defect_type=None): удалить после проверки
#     if defect_type is None:
#         defect_type = []
#
#     for i in range(8):
#         if data[i] == '0':
#             defect_type.append(5)
#         new_board = Board(multiboard_id=multiboard_id,
#                           datamatrix=data[i], side=side,
#                           defect_type=defect_type.copy())
#         if data[i] == '0':
#             defect_type.remove(5)
#         db.add(new_board)
#         db.commit()


def create_boards(inspection, multiboard_id, defect_type=None):
    db = get_connection()
    if defect_type is None:
        defect_type = []

    for i in range(8):
        if inspection.dm_values[i] == '0':
            defect_type.append(5)
        new_board = Board(multiboard_id=multiboard_id,
                          datamatrix=inspection.dm_values[i], side=inspection.side,
                          defect_type=defect_type.copy())
        if inspection.dm_values[i] == '0':
            defect_type.remove(5)
        db.add(new_board)
        db.commit()


def create_mulriboard():
    db = get_connection()
    new_multiboard = Multiboard()
    db.add(new_multiboard)
    db.commit()
    return new_multiboard.id


def get_multiboard(dm_values_without_zero):
    db = get_connection()
    checking_existence_multiboard_list = db.query(Board.multiboard_id).filter(
        Board.datamatrix.in_(dm_values_without_zero)).first()
    return checking_existence_multiboard_list


def create_inspection(inspection, reverse_flag, multiboard_id_for_new_inspection, status):
    db = get_connection()
    if status == [4]:
        status = 'REQUIRE_VERIFICATION'
    else:
        status = 'UNCHECKED'

    new_inspection = Inspection(time=inspection.datetime,
                                multiboard_id=multiboard_id_for_new_inspection, url_image=inspection.img_path,
                                sector_id=inspection.sector_id, status=status, side=inspection.side,
                                reading_order=reverse_flag)
    db.add(new_inspection)
    db.commit()


def sector_repeat_by_multiboard(mulriboard_repeat_list, sector_id):
    db = get_connection()
    return db.query(Inspection.multiboard_id).filter(Inspection.multiboard_id.in_(mulriboard_repeat_list),
                                              Inspection.sector_id == sector_id).all()


def get_multiboard_repeat_without_defect(db, dm_data_check_repeat):
    return db.query(Board.multiboard_id).filter(Board.datamatrix.in_(dm_data_check_repeat), not_(Board.defect_type.any(4))).all()


def get_board_repeat(db, multiboard_repeat_list):
    return db.query(Board).filter(Board.multiboard_id.in_(multiboard_repeat_list)).order_by(Board.id).all()


def update_board_reverse(db, dm_id_from_db, index, count_dm_in_multiboard,inspection):
    update_req = update(Board).where(Board.id == dm_id_from_db[index]).values(
        datamatrix=inspection.dm_values[count_dm_in_multiboard - index - 1])
    db.execute(update_req)
    board = db.query(Board).filter(Board.id == dm_id_from_db[index]).first()
    if board and board.defect_type and 5 in board.defect_type:
        board.defect_type.remove(5)
        update_defect = update(Board).where(Board.id == dm_id_from_db[index]).values(defect_type=board.defect_type)
        db.execute(update_defect)
    db.commit()


def update_board(db, dm_id_from_db, index, inspection):
    update_dm = update(Board).where(Board.id == dm_id_from_db[index]).values(
        datamatrix=inspection.dm_values[index])
    db.execute(update_dm)
    board = db.query(Board).filter(Board.id == dm_id_from_db[index]).first()
    if board and board.defect_type and 5 in board.defect_type:
        board.defect_type.remove(5)
        update_defect = update(Board).where(Board.id == dm_id_from_db[index]).values(defect_type=board.defect_type)
        db.execute(update_defect)
    db.commit()


def get_camera_id(sector_id: int):
    db = get_connection()
    camera_id = db.query(Sector.step_num).filter_by(id=sector_id).first()
    return camera_id


def get_connection():
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    ss = sessionmaker(bind=engine)
    session = ss()
    return session
