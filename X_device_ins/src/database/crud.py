from src.database.db_init import SQLALCHEMY_DATABASE_URL
from sqlalchemy.orm import sessionmaker
from src.database.models import SectorsDMPosition, Multiboard, Board, Inspection, Sector
from sqlalchemy import create_engine


# Это функция используется для получения координат datamatrix'ов в зависимости от выбранного сектора
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
    multiboard_set = {res[0] for res in db.query(Board.multiboard_id).filter(
        Board.datamatrix.in_(list(map(str, inspection.dm_values)))).all()}
    create_new_boards = True
    for multiboard_set_id in multiboard_set:
        board_list = [elem[0] for elem in db.query(Board.datamatrix).filter(Board.multiboard_id ==
                                                                            multiboard_set_id).all()]
        if board_list == inspection.dm_values:
            create_new_boards = False
            break
        else:
            create_new_boards = True

    if create_new_boards:
        if last_multiboard:
            new_multiboard_id = last_multiboard.multiboard_id + 1
        else:
            new_multiboard_id = 1
        new_multiboard = Multiboard(multiboard_id=new_multiboard_id)
        db.add(new_multiboard)
        db.flush()
        last_board_id = db.query(Board).order_by(Board.id.desc()).first()
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
        new_multiboard_id = db.query(Board.multiboard_id).filter_by(datamatrix=str(inspection.dm_values[0])).first()[0]
    last_inspection_id = db.query(Inspection).order_by(Inspection.id.desc()).first()

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




# Это функция используется для заполнения информации об инспекции в базу данных
# def insert_inspections_data(datamatrices, time, sector, image_path, side):
#     db = get_connection()
#     last_multiboard = db.query(Multiboard).order_by(Multiboard.multiboard_id.desc()).first()
#     if not db.query(Board).filter(Board.datamatrix.in_(list(map(str, datamatrices)))).all():
#         if last_multiboard:
#             new_multiboard_id = last_multiboard.multiboard_id + 1
#         else:
#             new_multiboard_id = 1
#         new_multiboard = Multiboard(multiboard_id=new_multiboard_id)
#         db.add(new_multiboard)
#         db.commit()
#         print(f'Добавлен новый элемент с multiboard_id = {new_multiboard_id}')
#         last_board_id = db.query(Board).order_by(Board.board_id.desc()).first()
#         if last_board_id:
#             new_board_id = last_board_id.board_id + 1
#         else:
#             new_board_id = 1
#         for i in range(1, 9):
#             new_board = Board(board_id=new_board_id + i, multiboard_id=new_multiboard_id,
#                               datamatrix=datamatrices[i - 1],
#                               status='UNCHECKED')
#             db.add(new_board)
#         db.commit()
#     else:
#         new_multiboard_id = db.query(Board.multiboard_id).filter_by(datamatrix=str(datamatrices[0])).first()[0]
#     last_inspection_id = db.query(Inspection).order_by(Inspection.inspection_id.desc()).first()
#     if last_inspection_id:
#         new_inspection_id = last_inspection_id.inspection_id + 1
#     else:
#         new_inspection_id = 1
#     new_inspection = Inspection(inspection_id=new_inspection_id, time=time, multiboard_id=new_multiboard_id,
#                                 url_image=image_path, sector_id=sector)
#     db.add(new_inspection)
#     db.commit()


# получение информации об id камеры
def get_camera_id(sector_id: int):
    db = get_connection()
    camera_id = db.query(Sector.step_num).filter_by(sector_id=sector_id).first()
    return camera_id


def get_connection():
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    ss = sessionmaker(bind=engine)
    session = ss()
    return session
