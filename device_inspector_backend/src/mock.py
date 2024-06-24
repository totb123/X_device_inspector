from datetime import datetime, timedelta, timezone
import random
from src.database.db import get_sector_db
from src.constants import SECTORS_COUNT, MULTI_BOARD_SIZE
import src.schemas as schemas

DAYS_COUNT = 2
MULTI_BOARDS_PER_DAY = 3
INSPECTIONS_PER_DAY = SECTORS_COUNT * MULTI_BOARDS_PER_DAY

MULTI_BOARDS_TOTAL = MULTI_BOARDS_PER_DAY * DAYS_COUNT


def get_datetime(ins_id_base: int, day_number: int):
    return datetime.now(tz=timezone.utc) + timedelta(days=day_number) + timedelta(minutes=ins_id_base)


def get_board_id(board_place: int, multi_board_id: int):
    offset_by_multi_boards = MULTI_BOARD_SIZE * (multi_board_id - 1)
    return board_place + offset_by_multi_boards


def get_sector_id(inspection_id: int):
    return (inspection_id - 1) % SECTORS_COUNT + 1


def get_multiboard_id(inspection_id: int):
    return (inspection_id - 1) // SECTORS_COUNT + 1


def get_inspection_id(inspection_id_base: int, day_num):
    offset_by_days = INSPECTIONS_PER_DAY * (day_num - 1)
    return inspection_id_base + offset_by_days


def build_boards_hash(mb_id: int):
    return {
        str(b_place):
            schemas.Board(
                datamatrix=random.randint(0, 2**15),
                id=get_board_id(board_place=b_place, multi_board_id=mb_id),
                # code=str(f'ABCDE{get_board_id(board_place=b_place, multi_board_id=mb_id)}'),
                multiboard_id=mb_id,
                status=schemas.BoardStatus.UNCHECKED
            ) for b_place in board_places
    }


inspection_ids_base = range(1, 1 + INSPECTIONS_PER_DAY)
multi_boards_ids = range(1, 1 + MULTI_BOARDS_TOTAL)
days_nums = range(1, DAYS_COUNT + 1)

board_places = range(1, MULTI_BOARD_SIZE + 1)


def build_inspection(ins_id: int, ins_id_base: int, day_num: int):
    return schemas.Inspection(
        id=ins_id,
        sector_id=get_sector_id(inspection_id=ins_id),
        multiboard_id=get_multiboard_id(inspection_id=ins_id),
        url_image=f'http://localhost:9090/static/{ins_id}',
        time=get_datetime(ins_id_base=ins_id_base, day_number=day_num)
    )


def build_fake_multi_boards():
    return [
       schemas.MultiBoard(
            id=mb_id,
            boards=dict(build_boards_hash(mb_id)),
        ) for mb_id in multi_boards_ids
    ]


def build_fake_sectors():
    return [schemas.Sector(
            id=sector_db.id, 
            name=sector_db.name, 
            step_num=sector_db.step_num
        ) for sector_db in get_sector_db()]
    # return [
    #     Sector(
    #         id=1,
    #         name='Гравировщик',
    #         step_num=1,
    #     ),
    #     Sector(
    #         id=2,
    #         name='Печь',
    #         step_num=2,
    #     ),
    #     Sector(
    #         id=3,
    #         name='Монтаж',
    #         step_num=3,
    #     ),
    #     Sector(
    #         id=4,
    #         name='Тестирование',
    #         step_num=4,
    #     ),
    # ]


def build_fake_inspections():
    inspections = []
    for day_num in days_nums:
        for ins_id_base in inspection_ids_base:
            ins_id = get_inspection_id(inspection_id_base=ins_id_base, day_num=day_num)
            inspections.append(build_inspection(ins_id=ins_id, ins_id_base=ins_id_base, day_num=day_num))
    return inspections


