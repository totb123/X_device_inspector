from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Table, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import ARRAY
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
    multiboard_id = Column(Integer, ForeignKey('multiboards.id'))
    multiboard = relationship("Multiboard")
    url_image = Column(String)
    sector_id = Column(Integer, ForeignKey('sectors.id'))
    sector = relationship("Sector")
    status = Column(String)
    side = Column(String)
    reading_order = Column(Boolean)


class Multiboard(Base):
    __tablename__ = 'multiboards'
    id = Column(Integer, primary_key=True)
    specification_id = Column(Integer, ForeignKey('specifications.id'))
    specification = relationship("Specification")


class DefectType(Base):
    __tablename__ = 'defects_types'
    id = Column(Integer, primary_key=True, autoincrement=True)
    defect_name = Column(String, nullable=False)


# заменить во втором бэке
class Board(Base):
    __tablename__ = 'boards'
    id = Column(Integer, primary_key=True)
    multiboard_id = Column(Integer, ForeignKey('multiboards.id'))
    datamatrix = Column(String)
    side = Column(String)
    defect_type = Column(ARRAY(Integer))
    multiboard = relationship("Multiboard")


class SectorsDMPosition(Base):
    __tablename__ = 'sectors_dm_position'

    id = Column(Integer, primary_key=True)
    id_sector = Column(Integer, ForeignKey('sectors.id'))
    specification_id = Column(Integer, ForeignKey('specifications.id'))
    side = Column(String)
    coordinates_1 = Column(String)
    coordinates_2 = Column(String)
    coordinates_3 = Column(String)
    coordinates_4 = Column(String)
    coordinates_5 = Column(String)
    coordinates_6 = Column(String)
    coordinates_7 = Column(String)
    coordinates_8 = Column(String)


class Specification(Base):
    __tablename__ = 'specifications'
    id = Column(Integer, primary_key=True)
    name = Column(String)


class CurrentParty(Base):
    __tablename__ = 'current_party'
    id = Column(Integer, primary_key=True)
    side = Column(String)
    specification_id = Column(Integer, ForeignKey('specifications.id'))
    specification = relationship("Specification")
