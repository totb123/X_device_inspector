import cv2


# TODO: проверить на работу функции на компьютере производства
class ImageRepository:
    def save_image(self, image, datetime, sector_id):
        time = datetime.strftime('%Y_%m_%d_%H_%M_%S')
        image_path = str(time) + '_' + str(sector_id) + ".jpg"
        cv2.imwrite("../X_device_inspector/device_inspector_backend/static/" + image_path, image)
        return image_path


