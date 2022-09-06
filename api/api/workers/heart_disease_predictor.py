import os
import pickle


curr_path = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(
    curr_path, '..', 'saved_models',
    'heart_disease_predictor', "model.pickel"
)

model = pickle.load(open(model_path, "rb"))


def predict(data_array):
    y = model.predict([data_array])

    return y[0]
