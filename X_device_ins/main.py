import cv2
import time
from src.inspector1.service import get_inspection
import uvicorn as uvicorn
# from fastapi import FastAPI, Query
from starlette.responses import JSONResponse
from src.inspector1.dataclasses import Camera
from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse
from typing import List
app = FastAPI()

camera_list = [Camera(1, cv2.VideoCapture(0))]
camera_list[0].cap.set(cv2.CAP_PROP_FRAME_WIDTH, 3840)
camera_list[0].cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 2160)
# # cap1 = cv2.VideoCapture(camera_id)
# # cap2 = cv2.VideoCapture(camera_id)


@app.get('/test')
def get_inspections_endpoint(sector_id: int):
    """
    Функция для теста
    """
    return get_inspection(sector_id, camera_list)
