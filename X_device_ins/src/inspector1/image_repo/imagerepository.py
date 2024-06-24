import cv2
import requests
import tempfile
import os
class ImageRepository:
    def save_image(self, image, datetime, sector_id):
        time = datetime.strftime('%Y_%m_%d_%H_%M_%S')
        image_path = str(time) + '_' + str(sector_id) + ".jpg"
        # with tempfile.TemporaryFile() as fp:
        #     fp.write()
        cv2.imwrite("D:/PycharmProjects/device_inspector-master/device_inspector_backend/static/" + image_path, image)
        # request.post(url,files={'file':image})
        return image_path
    
    # TODO: писал на скорую руку. Нужно переписать это так, чтобы соответсвовало коду
    def __get_image_path(self):
        return os.environ.get('FILE_PATH', "../device_inspector_backend/static/")
