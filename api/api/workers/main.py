from . import spam_classifier
from . import image_classifier
from . import ocr_worker
from . import heart_disease_predictor


def classify_spam(text):
    return spam_classifier.predict(text)


def classify_image(image):
    return image_classifier.predict(image)


def ocr(image):
    return ocr_worker.predict(image)


def predict_heart_disease(data):
    return heart_disease_predictor.predict(data)
