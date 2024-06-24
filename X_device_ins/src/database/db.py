# разбил на файлы crud, db_init, models
#
#
# from sqlalchemy import create_engine
# from sqlalchemy import Column, ForeignKey, Integer, String, TIMESTAMP, Boolean, LargeBinary, DateTime
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker, relationship
# from sqlalchemy import select
# import datetime
# import psycopg2
#
# SQLALCHEMY_DATABASE_URL = "postgresql://postgres:12345@localhost:5432/divice_inspector"
# Base = declarative_base()
#
#
# class Sector(Base):
#     __tablename__ = "sectors"
#     sector_id = Column(Integer, primary_key=True, index=True)
#     step_num = Column(Integer)
#     sector_name = Column(String)
#
#
# class Inspection(Base):
#     __tablename__ = 'inspections'
#     inspection_id = Column(Integer, primary_key=True)
#     time = Column(DateTime)
#     multiboard_id = Column(Integer, ForeignKey('multiboards.multiboard_id'))
#     multiboard = relationship("Multiboard")
#     url_image = Column(String)
#     sector_id = Column(Integer, ForeignKey('sectors.sector_id'))
#     sector = relationship("Sector")
#     comment = Column(String)
#
#
# class Multiboard(Base):
#     __tablename__ = 'multiboards'
#     multiboard_id = Column(Integer, primary_key=True)
#
#
# class Board(Base):
#     __tablename__ = 'boards'
#     board_id = Column(Integer, primary_key=True)
#     multiboard_id = Column(Integer, ForeignKey('multiboards.multiboard_id'))
#     datamatrix = Column(String)
#     status = Column(String)
#     multiboard = relationship("Multiboard")
#
#
# class SectorsDMPosition(Base):
#     __tablename__ = 'sectors_dm_position'
#
#     id = Column(Integer, primary_key=True)
#     id_sector = Column(Integer)
#     side = Column(String)
#     coordinates_1 = Column(String)
#     coordinates_2 = Column(String)
#     coordinates_3 = Column(String)
#     coordinates_4 = Column(String)
#     coordinates_5 = Column(String)
#     coordinates_6 = Column(String)
#     coordinates_7 = Column(String)
#     coordinates_8 = Column(String)
#
#
# def get_dm_position(sector_id):
#     db = get_connection()
#     # datamatrices = ['1','4','2','5']
#     # results = db.query(Board).filter(Board.datamatrix.in_(datamatrices)).all()
#     # print(results,"тут смотри")
#     results = db.query(SectorsDMPosition).filter_by(id_sector=sector_id).all()
#     list_results = []
#     for result in results:
#         list_results.append([result.id, result.id_sector, result.side, result.coordinates_1, result.coordinates_2,
#               result.coordinates_3, result.coordinates_4, result.coordinates_5, result.coordinates_6,
#               result.coordinates_7, result.coordinates_8])
#
#         print(result.id, result.id_sector, result.side, result.coordinates_1, result.coordinates_2,
#               result.coordinates_3, result.coordinates_4, result.coordinates_5, result.coordinates_6,
#               result.coordinates_7, result.coordinates_8)
#     return list_results
#
#
# def insert_inspections_data(datamatrices, time, sector, image_path):
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
#             new_board = Board(board_id=new_board_id+i, multiboard_id=new_multiboard_id, datamatrix=datamatrices[i-1],
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
#
# def get_connection():
#     engine = create_engine(SQLALCHEMY_DATABASE_URL)
#     ss = sessionmaker(bind=engine)
#     session = ss()
#     return session
