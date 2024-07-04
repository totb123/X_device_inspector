from src.database.db_init import SQLALCHEMY_DATABASE_URL
from sqlalchemy.orm import sessionmaker
from src.database.models import SectorsDMPosition, Multiboard, Board, Inspection, Sector
from sqlalchemy import create_engine, update


def get_dm_position(sector_id):
    db = get_connection()
    results = db.query(SectorsDMPosition).filter_by(id_sector=sector_id).all()
    for result in results:
        if result.side == "top":
            top_dict = {'side': result.side,
                        'coordinate_1': result.coordinates_1,
                        'coordinate_2': result.coordinates_2,
                        'coordinate_3': result.coordinates_3, 'coordinate_4': result.coordinates_4,
                        'coordinate_5': result.coordinates_5, 'coordinate_6': result.coordinates_6,
                        'coordinate_7': result.coordinates_7,
                        'coordinate_8': result.coordinates_8}  # !!! Что можно сделать, чтобы не заниматься такой ебалистикой? Описать интерфейс для этого запроса. results = db.query(FetchCoordinatesOutput).filter_by(id_sector=sector_id).all(). В переменной results у тебя все уже будет лежать.
        else:
            bot_dict = {'side': result.side,
                        'coordinate_1': result.coordinates_1,
                        'coordinate_2': result.coordinates_2,
                        'coordinate_3': result.coordinates_3, 'coordinate_4': result.coordinates_4,
                        'coordinate_5': result.coordinates_5, 'coordinate_6': result.coordinates_6,
                        'coordinate_7': result.coordinates_7, 'coordinate_8': result.coordinates_8}

    return top_dict, bot_dict


def insert_inspections(inspection):
    db = get_connection()
    db.begin()
    multiboard_set = {res[0] for res in db.query(Board.multiboard_id).filter(
        Board.datamatrix.in_(list(map(str, inspection.dm_values)))).all()}
    create_new_boards = True
    if multiboard_set:
        for multiboard_set_id in multiboard_set:
            board_list = [elem for elem in
                    db.query(Board.id, Board.datamatrix, Board.multiboard_id).filter(Board.multiboard_id ==
                                                                                             multiboard_set_id).all()]
            for board_list_dm in board_list:
                if not create_new_boards:
                    break
                new_multiboard_id = board_list_dm[2]
                for inspection_dm in inspection.dm_values:
                    if board_list_dm[1] != '0' and board_list_dm[1] == inspection_dm:
                        create_new_boards = False
                        break
                    else:
                        create_new_boards = True
            if not create_new_boards:
                break
        for index in range(len(board_list)):
            if board_list[index][1] != '0' and inspection.dm_values[index] == '0':
                inspection.dm_values[index] = board_list[index][1]
    if create_new_boards:
        new_multiboard = Multiboard()
        db.add(new_multiboard)
        db.commit()
        for i in range(1, 9):
            new_board = Board(multiboard_id=new_multiboard.id,
                              datamatrix=inspection.dm_values[i - 1])
            db.add(new_board)
            db.commit()
        db.flush()
        new_inspection = Inspection(time=inspection.datetime,
                                    multiboard_id=new_multiboard.id, url_image=inspection.img_path,
                                    sector_id=inspection.sector_id, status='UNCHECKED')
        db.add(new_inspection)
    else:
        update_id = [id_[0] for id_ in db.query(Board.id).
            filter(Board.multiboard_id == new_multiboard_id).order_by(Board.id).all()]
        for index in range(len(update_id)):
            db.query(Board).filter(Board.id == update_id[index]).update(
                {Board.datamatrix: inspection.dm_values[index]})
        db.commit()
        new_inspection = Inspection(time=inspection.datetime,
                                    multiboard_id=new_multiboard_id, url_image=inspection.img_path,
                                    sector_id=inspection.sector_id, status='UNCHECKED')
        db.add(new_inspection)
    try:
        db.commit()
        return True
    except:
        db.rollback()
        return False


def get_camera_id(sector_id: int):
    db = get_connection()
    camera_id = db.query(Sector.step_num).filter_by(sector_id=sector_id).first()
    return camera_id


def get_connection():
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    ss = sessionmaker(bind=engine)
    session = ss()
    return session
