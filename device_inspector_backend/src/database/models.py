from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Table, Boolean,ARRAY
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
    multiboard_id = Column(Integer, ForeignKey('multiboards.id'))
    multiboard = relationship("Multiboard")
    url_image = Column(String)
    side = Column(String)
    sector_id = Column(Integer, ForeignKey('sectors.id'))
    sector = relationship("Sector")
    status = Column(String)
    side = Column(String)
    reading_order = Column(Boolean)


class Multiboard(Base):
    __tablename__ = 'multiboards'
    id = Column(Integer, primary_key=True)
<<<<<<< HEAD


class DefectType(Base):
    __tablename__ = 'defects_types'
    id = Column(Integer, primary_key=True, autoincrement=True)
    defect_name = Column(String, nullable=False)
=======
    specification_id = Column(Integer, ForeignKey('specifications.id'))
>>>>>>> 01950fc85a915228b1b6398a018a4d7e77d1a9e2


class Board(Base):
    __tablename__ = 'boards'
    id = Column(Integer, primary_key=True)
    multiboard_id = Column(Integer, ForeignKey('multiboards.id'))
    datamatrix = Column(String)
<<<<<<< HEAD
    defect_type = Column(ARRAY(Integer))
=======
    side = Column(String)
>>>>>>> 01950fc85a915228b1b6398a018a4d7e77d1a9e2
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
