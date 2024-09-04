from minio import Minio
from minio.error import S3Error
import os
import io


class MinIORepository:
    def __init__(self):
        self.client = Minio(
            "127.0.0.1:9091",
            access_key="minioadmin",
            secret_key="minioadmin",
            secure=False
        )
        self.bucket_name = "python-test-bucket"
        found = self.client.bucket_exists(self.bucket_name)
        if not found:
            self.client.make_bucket(self.bucket_name)

    def upload_image(self, image, filename):
        image_stream = io.BytesIO(image)
        self.client.put_object(
            self.bucket_name,
            filename,
            image_stream,
            length=len(image),
            content_type='image/jpg'
        )
        print(f"Изображение {filename} загружено в MinIO в бакет {self.bucket_name}")