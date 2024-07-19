from datetime import datetime
from enum import Enum
from typing import List, Optional, Dict

from pydantic import BaseModel, ConfigDict

class BoardStatus(Enum):
    UNCHECKED = 'UNCHECKED'
    NORMAL = 'NORMAL'
    DEFECTIVE = 'DEFECTIVE'

class Board(BaseModel):
    id: int
    datamatrix: str
    multiboard_id: int
    side: str
    model_config = ConfigDict(from_attributes=True)

class MultiBoard(BaseModel):
    id: int
    boards: Dict[str, Optional[Board]]
    model_config = ConfigDict(from_attributes=True)


class CommentBase(BaseModel):
    pass


class CommentCreate(CommentBase):
    text: str


class Comment(CommentCreate):
    id: int
    

class Sector(BaseModel):
    id: int
    step_num: int
    name: str


class Inspection(BaseModel):
    id: int
    sector_id: int
    multiboard_id: int
    url_image: str
    side: str
    time: datetime
    status: BoardStatus


class InspectionsFilter(BaseModel):
    sector_ids: Optional[List[int]] = None
    multi_board_ids: Optional[List[int]] = None
    start_date: Optional[datetime] = None
    datamatrices: Optional[List[str]] = None
    end_date: Optional[datetime] = None
    skip: Optional[int] = None
    limit: Optional[int] = None


class SectorDMCoordinates(BaseModel):
    sector_id: int
    side: str
    coordinates: List[str]

class MultiBoardsFilter(BaseModel):
    ids: Optional[List[int]] = None
    board_codes: Optional[List[str]] = None


class EditDMsInput(BaseModel):
    board_ids: list[int]
    dms: list[str]
