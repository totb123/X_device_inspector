from typing import List

from src.mock import build_fake_sectors
from src.schemas import Sector
import src.database.db as db

sectors = build_fake_sectors()


def get_all_sectors() -> List[Sector]:
    return db.get_sector_db()
