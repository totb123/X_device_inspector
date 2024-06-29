from typing import List

from src.mock import build_fake_multi_boards
from src.schemas import MultiBoard
from src.schemas import MultiBoardsFilter

multi_boards = build_fake_multi_boards()
print(multi_boards[1], type(multi_boards))


def _passed_filters(mb: MultiBoard, filters: MultiBoardsFilter):
    if filters.ids and mb.id not in filters.ids:
        return False
    if filters.board_codes:
        for board in mb.boards.values():
            if board and board.code in filters.board_codes:
                return True
        return False
    return True


def get_multi_boards(filters: MultiBoardsFilter) -> List[MultiBoard]:
    return [
        multi_board
        for multi_board in multi_boards
        if _passed_filters(mb=multi_board, filters=filters)
    ]
