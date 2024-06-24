from src.database import db
import os
import aiofiles

async def update_inspections(image, inspection_id: int):
    save_result = await __save_image(image)
    if type(save_result) == str:
        return db.add_inspection_image(inspection_id=inspection_id, image_path=save_result.removeprefix('./static'))
    return "error saving file"


async def __save_image(image):
    try:
        file_path = f"{os.environ.get('FILE_PATH', './static')}/{image.filename}"
        async with aiofiles.open(file_path, 'wb') as f: 
            while chunk := await image.read(1024):
                await f.write(chunk)
        print(file_path)
        return file_path
    except Exception as e:
        print(e)
        return e