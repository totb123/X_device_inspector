from src.database.db import change_dm_position


def change_dm_position_f(id_sectors, side, coordinates_1, coordinates_2, coordinates_3, coordinates_4, coordinates_5,
                         coordinates_6, coordinates_7, coordinates_8):
    change_dm_position(id_sectors, side, coordinates_1, coordinates_2, coordinates_3, coordinates_4, coordinates_5,
                         coordinates_6, coordinates_7, coordinates_8)
    return True