from sqlalchemy.ext.declarative import declarative_base


SQLALCHEMY_DATABASE_URL = "postgresql://postgres:12345@localhost:5432/device_inspector_1"
Base = declarative_base()
