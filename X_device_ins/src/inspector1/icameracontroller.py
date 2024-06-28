
class ICamController:
    def get_image(self, camera):
        ret, image = camera.cap.read()
        if not ret:
            print("Failed to read frame from video stream")
            return None
        return image

