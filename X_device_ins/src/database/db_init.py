from sqlalchemy.ext.declarative import declarative_base
import os


SQLALCHEMY_DATABASE_URL = os.environ.get('DATABASE_URL', 'postgresql://postgres:12345@localhost:5432/device_inspector_1')
Base = declarative_base()
