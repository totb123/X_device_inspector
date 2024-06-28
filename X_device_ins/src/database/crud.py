from src.database.db_init import SQLALCHEMY_DATABASE_URL
from sqlalchemy.orm import sessionmaker
from src.database.models import SectorsDMPosition, Multiboard, Board, Inspection, Sector
from sqlalchemy import create_engine


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
    last_multiboard = db.query(Multiboard).order_by(Multiboard.multiboard_id.desc()).first()
    multiboard_set = {res[0] for res in db.query(Board.multiboard_id).filter( # !review! set_ids
        Board.datamatrix.in_(list(map(str, inspection.dm_values)))).all()}
    create_new_boards = True
    for multiboard_set_id in multiboard_set: # !review! убрать board_list
        board_list = [elem[0] for elem in db.query(Board.datamatrix).filter(Board.multiboard_id ==
                                                                            multiboard_set_id).all()]
        board_list_1 = [elem for elem in
                        db.query(Board.id, Board.datamatrix, Board.multiboard_id).filter(Board.multiboard_id ==
                                                                                         multiboard_set_id).all()]
        for board_list_dm in board_list_1:
            if not create_new_boards:
                break
            new_multiboard_id = board_list_dm[2]  # !review! убрать магические числа, сделать раскрытие tuple
            for inspection_dm in inspection.dm_values:
                if board_list_dm[1] != '0' and board_list_dm[1] == inspection_dm:
                    create_new_boards = False

                    print(board_list_dm[1], create_new_boards, inspection_dm)
                    break
                else:
                    create_new_boards = True
        if not create_new_boards:
            break
    print(board_list, inspection.dm_values, create_new_boards, new_multiboard_id)
    for index in range(len(board_list)):
        if board_list[index] != '0' and inspection.dm_values[index] == '0':
            inspection.dm_values[index] = board_list[index]
    print(inspection.dm_values)
    if create_new_boards:
        if last_multiboard:
            new_multiboard_id = last_multiboard.multiboard_id + 1  # !review! id во всех полях сделать типом primary serial key
        else:
            new_multiboard_id = 1
        new_multiboard = Multiboard(multiboard_id=new_multiboard_id)
        db.add(new_multiboard)
        db.flush()
        last_board_id = db.query(Board).order_by(Board.id.desc()).first() # !review! id во всех полях сделать типом primary serial key
        if last_board_id:
            new_board_id = last_board_id.id + 1
        else:
            new_board_id = 1
        for i in range(1, 9):
            new_board = Board(id=new_board_id + i, multiboard_id=new_multiboard_id,
                              datamatrix=inspection.dm_values[i - 1])
            db.add(new_board)
        db.flush()
    else:
        update_id = [id_[0] for id_ in db.query(Board.id).
            filter(Board.multiboard_id == new_multiboard_id).order_by(Board.id).all()]
        for index in range(len(update_id)):
            db.query(Board).filter(Board.id == update_id[index]).update(
                {Board.datamatrix: inspection.dm_values[index]})
        db.commit()
    last_inspection_id = db.query(Inspection).order_by(Inspection.id.desc()).first()  # !review! id во всех полях сделать типом primary serial key

    if last_inspection_id:
        new_inspection_id = last_inspection_id.id + 1
    else:
        new_inspection_id = 1
    new_inspection = Inspection(id=new_inspection_id, time=inspection.datetime,
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
