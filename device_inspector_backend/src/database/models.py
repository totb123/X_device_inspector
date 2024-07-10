from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class Sector(Base):
    __tablename__ = "sectors"
    id = Column(Integer, primary_key=True, index=True)
    step_num = Column(Integer)
    name = Column(String)

    # '''def __init__(self, id, step, name):
    #     self.id = id
    #     self.step_num = step
    #     self.name = name
    #
    #
    # def __repr__(self):
    #     return str(self.id) + ' ' + str(self.step_num) + ' ' + self.name
    # '''

# comments_of_inspection_table = Table(
#     'comments_of_inspection_table',
#     Base.metadata,
#     Column('comment_id', Integer, ForeignKey('comments.id')),
#     Column('inspection_id', Integer, ForeignKey('inspections.id')),
# )

class Comment(Base):
    __tablename__ = 'comments'
    id = Column(Integer, primary_key=True)
    inspections_id = Column(Integer, ForeignKey('inspections.id'))
    text = Column(String, nullable=False)

    # inspection = relationship(
    #     'Inspection',
    #     # secondary=comments_of_inspection_table,
    #     back_populates='comments'
    # )

class Inspection(Base):
    __tablename__ = 'inspections'
    id = Column(Integer, primary_key=True)
    time = Column(DateTime)
    multiboard_id = Column(Integer, ForeignKey('multiboards.multiboard_id'))
    multiboard = relationship("Multiboard")
    url_image = Column(String)
    sector_id = Column(Integer, ForeignKey('sectors.id'))
    sector = relationship("Sector")
    status = Column(String)
    # comments = relationship(
    #     'Comment',
    #     # secondary=comments_of_inspection_table,
    #     back_populates='inspection'
    # )



class Multiboard(Base):
    __tablename__ = 'multiboards'
    multiboard_id = Column(Integer, primary_key=True)


class Board(Base):
    __tablename__ = 'boards'
    id = Column(Integer, primary_key=True)
    multiboard_id = Column(Integer, ForeignKey('multiboards.multiboard_id'))
    datamatrix = Column(String)
    multiboard = relationship("Multiboard")


class SectorsDMPosition(Base):
    __tablename__ = 'sectors_dm_position'

    id = Column(Integer, primary_key=True)
    id_sector = Column(Integer, ForeignKey('sectors.id'))
    side = Column(String)
    coordinates_1 = Column(String)
    coordinates_2 = Column(String)
    coordinates_3 = Column(String)
    coordinates_4 = Column(String)
    coordinates_5 = Column(String)
    coordinates_6 = Column(String)
    coordinates_7 = Column(String)
    coordinates_8 = Column(String)

