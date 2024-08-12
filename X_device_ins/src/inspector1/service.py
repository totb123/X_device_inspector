from src.inspector1.isectorrepository import ISectorRepository
from src.inspector1.icameracontroller import ICamController
from src.inspector1.idmdecoder import IDmDetector
from src.inspector1.image_repo.imagerepository import ImageRepository
from src.inspector1.dataclasses import InsertInspection
from src.inspector1.insertinspections import insert_inspections
from src.inspector1.ioptioncreater import choosing_option_create_inspection
from src.inspector1.mock_operator import mock_operator_question
import cv2
from src.database.crud import get_connection
import time
import asyncio
from datetime import datetime
from src.inspector1.dataclasses import Inspection


def get_inspection(sector_id, camera_list):
    db = get_connection()
    dtime = datetime.now()
    sector_data = ISectorRepository().get_sector_data(sector_id, camera_list)
    image = ICamController().get_image(sector_data.camera)
    side, dm_data = IDmDetector().dm_decode(image, sector_data.coordinates)
    dm_data_backside = ['34000010', '0', '0', '0', '0', '0', '0', '0']  # заглушка для датаматриксов
    side_backside = 'bot' # доделать side_backside IDmDetector()
    inspection_data = Inspection(image, dm_data, side, dtime, sector_id)
    image_path = ImageRepository().save_image(inspection_data.image, inspection_data.datetime, inspection_data.sector_id)
    insert_inspections_data = InsertInspection(inspection_data.dm_values, inspection_data.side,
                                               inspection_data.datetime, inspection_data.sector_id,
                                               image_path, dm_data_backside, side_backside)
    defect_type, reading_order_override, update_flag = choosing_option_create_inspection(insert_inspections_data, db)

    insert_inspections(insert_inspections_data, db, defect_type, reading_order_override, update_flag)
    return defect_type

