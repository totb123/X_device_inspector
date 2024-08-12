from src.database.crud import get_connection, get_mulriboard_repeat,get_board_repeat
from src.database.models import SectorsDMPosition, Multiboard, Board, Inspection, Sector
from sqlalchemy import update


def insert_inspections_with_updates(inspection): # добавить проверку на наличие дефектов для подтяжки
    db = get_connection()
    count_dm_in_multiboard = len(inspection.dm_values)
    dm_data_check_repeat = [x for x in inspection.dm_values if x != '0']
    mulriboard_repeat = get_mulriboard_repeat(dm_data_check_repeat, db)
    if len(mulriboard_repeat) != 0:
        multiboard_repeat_list = [elem[0] for elem in set(mulriboard_repeat)]
        board_repeat = get_board_repeat(multiboard_repeat_list, db)

    dm_data_from_db, dm_id_from_db, multiboard_id_for_new_inspection = repeat_dm_data_from_database(board_repeat)
    reverse_flag = check_reverse_multiboard(count_dm_in_multiboard, inspection, dm_data_from_db)

    if reverse_flag is False:
        for index in range(count_dm_in_multiboard):
            if dm_data_from_db[index] == '0' and inspection.dm_values[count_dm_in_multiboard-index-1] != '0':
                update_req = update(Board).where(Board.id == dm_id_from_db[index]).values(datamatrix=inspection.dm_values[count_dm_in_multiboard-index-1])
                db.execute(update_req)
    if reverse_flag is True:
        for index in range(count_dm_in_multiboard):
            if dm_data_from_db[index] == '0' and inspection.dm_values[index] != '0':
                update_req = update(Board).where(Board.id == dm_id_from_db[index]).values(datamatrix=inspection.dm_values[index])
                db.execute(update_req)
    db.commit()
    new_inspection = Inspection(time=inspection.datetime,
                                multiboard_id=multiboard_id_for_new_inspection, url_image=inspection.img_path,
                                sector_id=inspection.sector_id, status='UNCHECKED', side=inspection.side,
                                reading_order=reverse_flag)
    db.add(new_inspection)
    db.commit()


def fun(count_dm_in_multiboard, dm_data_from_db, inspection,reverse_flag):
    for index in range(count_dm_in_multiboard):
        if dm_data_from_db[index] == '0':
            # Определяем индекс для получения значения в зависимости от флага.
            inspection_index = count_dm_in_multiboard - index - 1 if not reverse_flag else index
            if inspection.dm_values[inspection_index] != '0':
                update_req = update(Board).where(Board.id == dm_id_from_db[index]).values(
                    datamatrix=inspection.dm_values[inspection_index])
                db.execute(update_req)


def check_reverse_multiboard(count_dm_in_multiboard, inspection, dm_data_from_db):
    for index in range(count_dm_in_multiboard):
        if dm_data_from_db[index] == inspection.dm_values[count_dm_in_multiboard-index-1] and dm_data_from_db[index] != '0' and inspection.dm_values[count_dm_in_multiboard-index-1] != '0':
            return False
    for index in range(count_dm_in_multiboard):
        if dm_data_from_db[index] == inspection.dm_values[index] and dm_data_from_db[index] != '0' and inspection.dm_values[index] != '0':
            return True


def repeat_dm_data_from_database(board_repeat):
    dm_data_from_db = []
    dm_id_from_db = []
    for elem in board_repeat:
        dm_data_from_db.append(elem.datamatrix)
        dm_id_from_db.append(elem.id)
        multiboard_id_for_new_inspection = elem.multiboard_id
    return dm_data_from_db, dm_id_from_db, multiboard_id_for_new_inspection