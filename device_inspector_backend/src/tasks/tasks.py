from src.tasks.celery import celery_app
from datetime import datetime, timedelta, time
import os
from src.database.db import get_inspections_by_criteria
from src.database.iminio import MinIORepository

@celery_app.task(name="archive_yesterdays_images")
def archive_yesterdays_images():
    archive_day = datetime.now() - timedelta(days=1)
    start_of_day = datetime.combine(datetime.now(), time.min)
    end_of_day = datetime.combine(datetime.now(), time.max)
    inspections = get_inspections_by_criteria(start_time=start_of_day, end_time=end_of_day)
    dir_name = f"{os.environ.get('FILE_PATH', './static')}"
    zip_name = f"{archive_day.strftime('%Y_%m_%d')}.zip"
    minio = MinIORepository()
    minio.archive_files(inspections, dir_name, zip_name)

