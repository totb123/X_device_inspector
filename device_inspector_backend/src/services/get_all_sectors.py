from typing import List
from src.schemas import Sector
import src.database.db as db


def get_all_sectors() -> List[Sector]:
    return db.get_sector_db()
