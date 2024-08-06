import os
from minio import Minio
from minio.error import S3Error
import cv2
from datetime import datetime, time
# from src.schemas import Inspection
import zipfile

class TInspectionXDI:
    def __init__(self, image, dm_values, side, datetime, sector_id):
        self.image = image
        self.dm_values = dm_values
        self.side = side
        self.datetime = datetime
        self.sector_id = sector_id

class Inspection:
    def __init__(self, url_image):
        self.url_image = url_image


class MinIORepository:
    def __init__(self):
        self.client = Minio(
            "127.0.0.1:9000",
            access_key="fyCNz0MRuYj9fL0SQUYI",
            secret_key="5ZkkxzjuVgk88YuzgmsTxMRgwYwQsc7G678HO7PI",
            secure=False
        )
        self.bucket_name = "python-test-bucket"
        found = self.client.bucket_exists(self.bucket_name)
        if not found:
            self.client.make_bucket(self.bucket_name)

    def save_image(self, inspection: TInspectionXDI):
        try:
            dir_name = os.path.dirname(os.path.realpath(__file__)) + '/image'
            time = inspection.datetime.strftime('%Y_%m_%d_%H_%M_%S')
            file_name = str(time) + '_' + str(inspection.sector_id) + ".jpg"
            image_path = dir_name + file_name
            cv2.imwrite(image_path, inspection.image)
            destination_file = file_name
            self.client.fput_object(
                self.bucket_name, destination_file, image_path,
            )  
            os.remove(image_path)
            return True
        except S3Error as exc:
            return False
        

    def create_txt_file_and_save_image(self, inspection: TInspectionXDI):
        try:
            dir_name = os.path.dirname(os.path.realpath(__file__)) + '/image'
            time = inspection.datetime.strftime('%Y_%m_%d_%H_%M_%S')
            file_name = str(time) + '_' + str(inspection.sector_id)
            image_name = file_name + ".jpg"
            image_path = dir_name + '/' + image_name
            cv2.imwrite(image_path, inspection.image)
            with open (image_path, 'rb') as file:
                image_txt = file.read()
            txt_name = file_name + ".txt"
            txt_path = dir_name + '/' + txt_name
            with open(txt_path, 'wb') as f:
                f.write(image_txt)
            destination_file = txt_name
            self.client.fput_object(
                self.bucket_name, destination_file, txt_path,
            )
            # os.remove(image_path)
            return True
        except S3Error as exc:
            return False
        

    def archive_files(self, inspections: list[Inspection], dir_name: str, zip_name: str):
        try:
            zip_path = f"{dir_name}/{zip_name}"
            zipf = zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED)
            for inspection in inspections:
                image_path = f"{dir_name}/{inspection.url_image}"
                self.client.fget_object(
                    self.bucket_name, inspection.url_image, image_path,
                )
                zipf.write(image_path, inspection.url_image)
            zipf.close()
            self.client.fput_object(
                self.bucket_name, zip_name, zip_path,
            )
            for inspection in inspections:
                os.remove(f"{dir_name}/{inspection.url_image}")
                self.client.remove_object(self.bucket_name, inspection.url_image)
            os.remove(zip_path)
            return True
        except S3Error as exc:
            print(f"MinIO error: {exc}")
            return False
        

    def unzip_files(self, zip_name: str, dir_to_save: str):
        try:
            zip_path = f"{dir_to_save}/{zip_name}"
            self.client.fget_object(
                self.bucket_name, zip_name, zip_path,
            )
            with zipfile.ZipFile(zip_path, "r") as zip_ref:
                zip_ref.extractall(dir_to_save)
            return True
        except S3Error as exc:
            return False


img = cv2.imread('2024_07_15_15_16_30_1.jpg', 0)
rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
inspectionXDI = TInspectionXDI(
    image=rgb_img,
    dm_values=[],
    side='',
    datetime=datetime(
        year=2024,
        month=7,
        day=31,
        hour=15,
        minute=1,
        second=5,
    ),
    sector_id=1
)
img_rep = MinIORepository()
img_rep.create_txt_file_and_save_image(inspection=inspectionXDI)

# start_of_day = datetime.combine(
#         datetime(
#         year=2024,
#         month=7,
#         day=15,
#         hour=11,
#         minute=51,
#         second=19,
#     ), 
#     time.min)
# end_of_day = datetime.combine(datetime.now(), time.max)

inspections = [
    Inspection('2024_07_31_15_01_05_1.txt'),
    # Inspection('2024_07_15_15_00_05_1.jpg'),
]
print(img_rep.archive_files(inspections, 'image', 'txt_zip.zip'))
