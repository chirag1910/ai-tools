import os
import pickle


curr_path = os.path.dirname(os.path.abspath(__file__))
model_dir = os.path.abspath(os.path.join(
    curr_path, '..', 'saved_models', 'spam_classifier'
))

model_path = os.path.join(model_dir, "model.pickel")
vector_path = os.path.join(model_dir, "vector.pickel")

cv = pickle.load(open(vector_path, "rb"))
model = pickle.load(open(model_path, "rb"))


def predict(text):
    text = cv.transform([text]).toarray()

    y = model.predict(text)

    return y[0]
