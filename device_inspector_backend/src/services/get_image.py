from src.database.iminio import MinIORepository
from datetime import datetime
import os
import shutil

def get_image_from_zip_service(path: str):
    minio = MinIORepository()
    date = get_date_from_image_path(path)
    if date is None: 
        return None
    dir_to_save = create_dir_to_save(path)
    zip_name = f"{date.strftime('%Y_%m_%d')}.zip"
    success_unzip = minio.unzip_files(zip_name, dir_to_save)
    if success_unzip and os.path.exists(f"{dir_to_save}/{path}"):
        with open (f"{dir_to_save}/{path}", 'rb') as file:
            image = file.read()
        shutil.rmtree(dir_to_save)
        return image
    return None



def get_date_from_image_path(path: str) -> datetime:
    try:
        [year,
        month,
        day,
        hour,
        minute,
        second,
        sector_id] = path.split('_')
        return datetime(int(year), int(month), int(day))
    except:
        return None


def create_dir_to_save(image_path: str):
    dir_static = f"{os.environ.get('FILE_PATH', './static')}"
    dir_to_save = dir_static + f"/{datetime.now().strftime('%Y_%m_%d_%H_%M_%S.%f')}"
    os.mkdir(dir_to_save)
    return dir_to_save
