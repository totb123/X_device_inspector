import src.schemas as schemas
import src.database.db as db
def get_coordinates(sector_id: int, side: str)-> schemas.SectorDMCoordinates:
  db_coordinates = db.get_dm_coordinates(sector_id, side.lower())
  return schemas.SectorDMCoordinates(
    sector_id = db_coordinates.id_sector, 
    side = db_coordinates.side,
    coordinates = [
      db_coordinates.coordinates_1,
      db_coordinates.coordinates_2,
      db_coordinates.coordinates_3,
      db_coordinates.coordinates_4,
      db_coordinates.coordinates_5,
      db_coordinates.coordinates_6,
      db_coordinates.coordinates_7,
      db_coordinates.coordinates_8
    ] 
  )