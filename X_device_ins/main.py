import cv2
import time
from src.inspector1.service import get_inspection
import uvicorn as uvicorn
from fastapi import FastAPI, Query
from src.inspector1.dataclasses import Camera

app = FastAPI()

camera_list = [Camera(1, cv2.VideoCapture(0))]
camera_list[0].cap.set(cv2.CAP_PROP_FRAME_WIDTH, 3840)
camera_list[0].cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 2160)
# # cap1 = cv2.VideoCapture(camera_id)
# # cap2 = cv2.VideoCapture(camera_id)


@app.get('/test')
def get_inspections_endpoint(sector_id: int):
    """
    функция для тестирования
    """
    # cap = camera_list[0].cap
    # ret, image = cap.read()
    # cv2.imshow("sdf", image)
    # cv2.waitKey(0)
    return get_inspection(sector_id, camera_list)



