from src.database.crud import create_mulriboard, update_board_reverse, \
    get_multiboard_repeat_without_defect, get_board_repeat, create_inspection, update_board,\
    sector_repeat_by_multiboard, create_boards


def get_dm_values_without_zero(dm_values):
    return [value for value in dm_values if value != '0']


def determine_reading_order(inspection_dm_values, dm_data_from_db=[]):
    count_dm_in_multiboard = len(inspection_dm_values)
    if dm_data_from_db:
        for index in range(count_dm_in_multiboard):
            if (dm_data_from_db[index] == inspection_dm_values[count_dm_in_multiboard - index - 1] and
                    dm_data_from_db[index] != '0' and
                    inspection_dm_values[count_dm_in_multiboard - index - 1] != '0'):
                return False
    return True


def update_boards(db, board_repeat, inspection, reading_order):
    dm_data_from_db = [elem.datamatrix for elem in board_repeat]
    dm_id_from_db = [elem.id for elem in board_repeat]

    if not reading_order:
        for index in range(len(inspection.dm_values)):
            if (dm_data_from_db[index] == '0' and
                    inspection.dm_values[len(inspection.dm_values) - index - 1] != '0'):

                update_board_reverse(db, dm_id_from_db, index, len(inspection.dm_values), inspection)
    else:
        for index in range(len(inspection.dm_values)):
            if (dm_data_from_db[index] == '0' and
                    inspection.dm_values[index] != '0'):
                update_board(db, dm_id_from_db, index, inspection)


def insert_inspections(inspection, db, defect_type=None, reading_order_override=None, update_flag=False):
    if defect_type is None:
        defect_type = []

    dm_data_check_repeat = get_dm_values_without_zero(inspection.dm_values)
    mulriboard_repeat = get_multiboard_repeat_without_defect(db, dm_data_check_repeat)

    if mulriboard_repeat and defect_type != [4]:
        multiboard_repeat_list = [elem[0] for elem in set(mulriboard_repeat)]
        multiboard_id_for_new_inspection = multiboard_repeat_list[0]
        board_repeat = get_board_repeat(db, multiboard_repeat_list)
        reading_order = reading_order_override if reading_order_override is not None else determine_reading_order(
            inspection.dm_values, [elem.datamatrix for elem in board_repeat])
        if update_flag:
            update_boards(db, board_repeat, inspection, reading_order)
    else:
        multiboard_id_for_new_inspection = create_mulriboard()
        reading_order = determine_reading_order(inspection.dm_values)
        create_boards(inspection, multiboard_id_for_new_inspection, defect_type)

    create_inspection(inspection, reading_order, multiboard_id_for_new_inspection, defect_type)

