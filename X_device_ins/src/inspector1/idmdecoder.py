from pylibdmtx.pylibdmtx import decode
import cv2
import random


def cropped_image(img, dm_position):
    list_coordinates = list(map(int, dm_position.split(',')))
    image = img[list_coordinates[0]:list_coordinates[1], list_coordinates[2]:list_coordinates[3]] # y1 y2 x1 x2
    return image


def decode_datamatrix(img, dm_position):
    image_decode = cropped_image(img, dm_position)
    decoded_objects = decode(image_decode)
    if decoded_objects:
        return str(decoded_objects[0].data.decode('utf-8'))
    else:
        return "0"


def choose_side(image, coords, result):
    for index in range(len(coords.top)):
        result_top = decode_datamatrix(image, coords.top[index])
        if result_top != "0":
            result[index] = result_top
            return index + 1, coords.top, True
        result_bot = decode_datamatrix(image, coords.bot[index])
        if result_bot != "0":
            result[index] = result_bot
            return index + 1, coords.bot, False
    return None, None, None


def dm_detect(index, true_coords, result, image):
    for i in range(index, len(true_coords)):
        result[i] = decode_datamatrix(image, true_coords[i])
    return result


class IDmDetector:
    def __init__(self):
        self.dm_values_results = ["0", "0", "0", "0", "0", "0", "0", "0"]

    def dm_decode(self, image, coords):
        index, true_coords, side = choose_side(image, coords, self.dm_values_results)
        if index is None:
            return None, self.dm_values_results
        dm_detect(index, true_coords, self.dm_values_results, image)
        return side, self.dm_values_results
