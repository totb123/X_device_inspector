from celery import Celery
from celery.schedules import crontab


celery_app = Celery(
    "tasks",
    broker="redis://localhost:6379",
    include=["src.tasks.tasks"]
)

celery_app.conf.beat_schedule = {
    "archive_images": {
        "task": "archive_yesterdays_images",
        "schedule": crontab(minute="17", hour="8"), # -3 по Красногорску
    }
}
