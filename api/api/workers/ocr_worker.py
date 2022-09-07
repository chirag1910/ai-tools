import pytesseract
from cv2 import imdecode, IMREAD_COLOR, cvtColor, COLOR_BGR2RGB
from numpy import frombuffer, uint8
from base64 import b64decode

# update tesseract.exe path here
# default path is r"C:\Users\<user>\AppData\Local\Tesseract-OCR\tesseract.exe"
pytesseract.pytesseract.tesseract_cmd = r""
config = ('-l eng --oem 1 --psm 3')


def readb64(img_b64):
    img_bytes = b64decode(img_b64)
    img_arr = frombuffer(img_bytes, dtype=uint8)
    img = imdecode(img_arr, flags=IMREAD_COLOR)
    return img


def predict(img_b64):
    img = readb64(img_b64)
    img = cvtColor(img, COLOR_BGR2RGB)

    text_string = pytesseract.image_to_string(img)

    return text_string
