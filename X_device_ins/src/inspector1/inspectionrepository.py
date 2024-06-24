from src.inspector1.image_repo.imagerepository import ImageRepository
from src.inspector1.dataclasses import InsertInspection
from src.database.crud import insert_inspections


class InspectionRepository:
    def image_repo_crud(self, inspection):
        image_path = ImageRepository().save_image(inspection.image, inspection.datetime, inspection.sector_id)
        insert_inspections_data = InsertInspection(inspection.dm_values, inspection.side, inspection.datetime,
                                                   inspection.sector_id, image_path)
        return insert_inspections(insert_inspections_data)