from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

db_path = 'postgresql://postgres:postgres@localhost:5432/device_inspector_1'

session = sessionmaker(bind=create_engine(db_path))