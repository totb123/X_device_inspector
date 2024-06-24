

class Camera:
    def __init__(self, camera_id, cap):
        self.id = camera_id
        self.cap = cap


class DmData:
    def __init__(self, side, dm_values):
        self.side = side
        self.dm_values = dm_values


class Inspection:
    def __init__(self, image, dm_values, side, datetime, sector_id):
        self.image = image
        self.dm_values = dm_values
        self.side = side
        self.datetime = datetime
        self.sector_id = sector_id


class InsertInspection:
    def __init__(self, dm_values, side, datetime, sector_id, img_path):
        self.dm_values = dm_values
        self.side = side
        self.datetime = datetime
        self.sector_id = sector_id
        self.img_path = img_path


class SectorCoords:
    def __init__(self, top_coords, bot_coords):
        self.top = top_coords
        self.bot = bot_coords


class Sector:
    def __init__(self, camera, coordinates):
        self.camera = camera
        self.coordinates = coordinates


