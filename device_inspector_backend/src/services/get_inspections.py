import pytz
from typing import List
import src.schemas as schemas
from src.schemas import InspectionsFilter


def _passed_filters(inspection: schemas.Inspection, idx: int, filters: InspectionsFilter) -> bool:
    if any((
        filters.start_date and inspection.time.replace(tzinfo=pytz.utc) < filters.start_date,
        filters.end_date and inspection.time.replace(tzinfo=pytz.utc) > filters.end_date,
        filters.sector_ids and inspection.sector_id not in filters.sector_ids,
        filters.multi_board_ids and inspection.multiboard_id not in filters.multi_board_ids,
        filters.skip is not None and filters.limit is not None and (
                idx < filters.skip or idx >= filters.skip + filters.limit
        ),
    )):
        return False
    return True


def get_inspections(filters: InspectionsFilter, inspection_1: List) -> List[schemas.Inspection]:
    return [
        inspection
        for idx, inspection in enumerate(inspection_1, 0)
        if _passed_filters(inspection, idx, filters)
    ]