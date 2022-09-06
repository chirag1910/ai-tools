import os
from tensorflow import keras
from cv2 import imdecode, IMREAD_COLOR, resize, cvtColor, COLOR_BGR2RGB
from numpy import expand_dims, argmax, max, frombuffer, uint8
from base64 import b64decode


curr_path = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.abspath(os.path.join(
    curr_path, '..', 'saved_models', 'image_classifier'
))

translate = {
    "cane": "dog", "cavallo": "horse", "elefante": "elephant", "farfalla": "butterfly", "gallina": "chicken",
    "gatto": "cat", "mucca": "cow", "pecora": "sheep", "ragno": "spider", "scoiattolo": "squirrel",
}
class_names = sorted([key for key in translate])

model = keras.models.load_model(model_path)

img_height = 200
img_width = 200


def readb64(img_b64):
    img_bytes = b64decode(img_b64)
    img_arr = frombuffer(img_bytes, dtype=uint8)
    img = imdecode(img_arr, flags=IMREAD_COLOR)
    return img


def predict(img_b64):
    img = readb64(img_b64)
    img = resize(img, (img_height, img_width))
    img = cvtColor(img, COLOR_BGR2RGB)
    img = expand_dims(img, axis=0)

    prediction = model.predict(img / 255)[0]

    return (translate[class_names[argmax(prediction)]], 100 * max(prediction))
