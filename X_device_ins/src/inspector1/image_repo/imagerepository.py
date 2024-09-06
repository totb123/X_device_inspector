import cv2
from datetime import datetime
from src.inspector1.iminio import MinIORepository

# TODO: проверить на работу функции на компьютере производства
class ImageRepository:
    def save_image_local_machine(self, image, datetime, sector_id):
        time = datetime.strftime('%Y_%m_%d_%H_%M_%S') # может быть ошибка, что мы не найдем фотку из-за разного времени
        image_path = str(time) + '_' + str(sector_id) + ".jpg"
        cv2.imwrite("../X_device_inspector/device_inspector_backend/static/" + image_path, image)
        return image_path

    def save_image_minio(self, image, inspection_data):
        if image is None:
            print("Не удалось загрузить изображение.")
            return
        _, buffer = cv2.imencode('.jpg', image)
        image_data = buffer.tobytes()
        time = inspection_data.datetime.strftime('%Y_%m_%d_%H_%M_%S')
        image_path = f"{time}_{str(inspection_data.sector_id)}.jpg"
        MinIORepository().upload_image(image_data, image_path)
        return image_path

