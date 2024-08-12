from src.database.crud import get_multiboard_repeat_without_defect, sector_repeat_by_multiboard
from src.inspector1.mock_operator import mock_operator_question


def get_dm_values_without_zero(dm_values):
    return [value for value in dm_values if value != '0']


def choosing_option_create_inspection(inspection, db):
    flag_dm_repeat, sector_id_repeat = get_dm_data_repeat(inspection.dm_values, inspection.sector_id, db)

    if flag_dm_repeat:
        if sector_id_repeat:
            marking_defect = mock_operator_question()
            defect_type = [4] if marking_defect else None
            reading_order_override = True if marking_defect else None
            update_flag = False if marking_defect else True
            return defect_type, reading_order_override, update_flag
        else:
            return None, None, True
    else:
        return None, None, False


def get_dm_data_repeat(dm_data, sector_id, db):
    dm_data = get_dm_values_without_zero(dm_data)
    mulriboard_repeat = get_multiboard_repeat_without_defect(db, dm_data)
    if mulriboard_repeat:
        sector_repeat = sector_repeat_by_multiboard([elem[0] for elem in set(mulriboard_repeat)], sector_id)
        return True, sector_repeat
    return False, False
