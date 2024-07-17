from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class Sector(Base):
    __tablename__ = "sectors"
    id = Column(Integer, primary_key=True, index=True)
    step_num = Column(Integer)
    name = Column(String)

class Comment(Base):
    __tablename__ = 'comments'
    id = Column(Integer, primary_key=True)
    inspections_id = Column(Integer, ForeignKey('inspections.id'))
    text = Column(String, nullable=False)


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
    side = Column(String)


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

