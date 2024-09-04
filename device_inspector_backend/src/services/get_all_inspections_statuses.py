from typing import List

import src.database.db as db


def get_all_inspection_statuses() -> List[str]:
    retrieved_statuses = db.get_all_statuses_db()
    return [status_tupple[0] for status_tupple in retrieved_statuses]