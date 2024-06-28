from src.inspector1.isectorrepository import ISectorRepository
from src.inspector1.icameracontroller import ICamController
from src.inspector1.idmdecoder import IDmDetector
from src.inspector1.inspectionrepository import InspectionRepository
import cv2
import time
from datetime import datetime
from src.inspector1.dataclasses import Inspection


def get_inspection(sector_id, camera_list):
    dtime = datetime.now() 
    sector_data = ISectorRepository().get_sector_data(sector_id, camera_list)
    image = ICamController().get_image(sector_data.camera)
    side, dm_data = IDmDetector().dm_decode(image, sector_data.coordinates)
    inspection_data = Inspection(image, dm_data, side, dtime, sector_id)
    print(dm_data) # !review! этот принт вообще удалить сразу
    return InspectionRepository().image_repo_crud(inspection_data)
