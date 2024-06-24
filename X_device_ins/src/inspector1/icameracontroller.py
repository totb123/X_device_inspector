
class ICamController:
    def get_image(self, camera):
        ret, image = camera.cap.read()
        if not ret:
            print("Failed to read frame from video stream")
            return None
        #!!! На это место еще добавить функцию cv2, которая у тебя в сервисе
        return image

