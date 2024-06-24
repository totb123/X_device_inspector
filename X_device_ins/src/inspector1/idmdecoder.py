from pylibdmtx.pylibdmtx import decode
import cv2
import random

# функция для обрезания нужной области фотографии и распознования datamatrix'а
def decode_datamatrix(img, dm_position):
    list_coordinates = list(map(int, dm_position.split(',')))

    print(list_coordinates)
    cropped_image = img[list_coordinates[0]:list_coordinates[1], list_coordinates[2]:list_coordinates[3]]  # y1 y2 x1 x2
    # cv2.imshow("fewf", cropped_image)
    cv2.imwrite("src/inspector1/image_repo//" + str(random.randint(1, 10000)) + ".jpg", cropped_image)
    # cv2.waitKey(0)
    decoded_objects = decode(cropped_image)
    if decoded_objects:
        print(decoded_objects[0].data.decode('utf-8'))
        return str(decoded_objects[0].data.decode('utf-8'))
    else:
        return "0"


def choose_side(image, coords, result):
    for index in range(len(coords.top)):
        result_top = decode_datamatrix(image, coords.top[index])
        result_bot = decode_datamatrix(image, coords.bot[index])
        if result_top != "0":
            result[index] = result_top
            return index + 1, coords.top, "top"
        if result_bot != "0":
            result[index] = result_bot
            return index + 1, coords.bot, "bot"
    return None, None, None


def dm_detect(index, true_coords, result, image):
    for i in range(index, len(true_coords)):
        result[i] = decode_datamatrix(image, true_coords[i])
    return result


class IDmDetector:
    def __init__(self):
        self.result = ["0", "0", "0", "0", "0", "0", "0", "0"]

    def dm_decode(self, image, coords):
        index, true_coords, side = choose_side(image, coords, self.result)
        if index is None:
            return None, self.result
        dm_detect(index, true_coords, self.result, image)
        return side, self.result
