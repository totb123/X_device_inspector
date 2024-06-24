from abc import ABC, abstractmethod
from src.inspector1.dataclasses import Sector, SectorCoords
from src.inspector1.config import sectors_camera
from src.database.crud import get_dm_position


def extract_coordinates(dm_position_result):
    coordinates_list = []
    start_flag = False
    for key, value in dm_position_result.items():
        if key == 'coordinate_1': #!!! Алгоритм ненадежный. Тебе словарь не гарантирует порядок ключей. У тебя в какой-то момент coordinate_1 может оказаться не на первом месте.
            start_flag = True
        if start_flag:
            coordinates_list.append(value) #!!! Я оставлял коммент по этому алгоритму на прошлом ревью. Можем вместе сесть и я тебе расскажу, как пройтись по этому словарю с помощью сорт.
    return coordinates_list


def get_camera(sector_id, camera_list):
    for camera in camera_list:
        if camera.id == sectors_camera[sector_id]:
            return camera
    return None


def get_coordinates(sector_id):
    dm_position_result_top, dm_position_result_bot = get_dm_position(sector_id)
    coordinates_list_top = extract_coordinates(dm_position_result_top)
    coordinates_list_bot = extract_coordinates(dm_position_result_bot)
    return SectorCoords(coordinates_list_top, coordinates_list_bot)


class ISectorRepository:
    def get_sector_data(self, sector_id: int, camera_list: list) -> Sector: #!!! Если начинаешь использовать типы, то создай их во всех функциях. Выглядит хорошо!
        camera = get_camera(sector_id, camera_list)
        sector_coords = get_coordinates(sector_id)
        return Sector(camera, sector_coords)



