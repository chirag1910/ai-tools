import os
import numpy as np
import cv2 as cv
from keras.models import Sequential
from keras.layers import Dense, Flatten, Conv2D, MaxPooling2D, Dropout
from keras.utils import to_categorical


if (__name__ == '__main__'):
    curr_path = os.path.dirname(os.path.abspath(__file__))
    dataset_path = os.path.join(
        curr_path, "..", "datasets", "animals"
    )

    model_dir = os.path.join(curr_path, "saved_models")
    model_path = os.path.join(model_dir, "image_classifier")

    if not os.path.exists(dataset_path):
        raise Exception(f"{dataset_path} not found")

    img_height = 200
    img_width = 200
    epochs = 25

    x = []
    y = []

    labels = sorted(os.listdir(dataset_path))

    for i in range(len(labels)):
        label_path = os.path.join(dataset_path, labels[i])
        images = os.listdir(label_path)
        for image in images:
            image_path = os.path.join(label_path, image)
            img = cv.imread(image_path)
            img = cv.resize(img, (img_height, img_width))
            img = cv.cvtColor(img, cv.COLOR_BGR2RGB)
            x.append(img)
            y.append(i)

    x = np.array(x) / 255
    y = to_categorical(np.array(y))

    model = Sequential()
    model.add(Conv2D(
        32, (3, 3),
        activation="relu",
        input_shape=(img_height, img_width, 3)
    ))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Flatten())
    model.add(Dense(1000, activation="relu"))
    model.add(Dropout(0.2))
    model.add(Dense(500, activation="relu"))
    model.add(Dropout(0.2))
    model.add(Dense(250, activation="relu"))
    model.add(Dense(len(labels), activation="softmax"))

    model.compile(
        loss="categorical_crossentropy",
        optimizer="adam",
        metrics=["accuracy"]
    )

    hist = model.fit(
        x,
        y,
        batch_size=256,
        epochs=epochs,
    )

    print("Model created successfully")

    if not os.path.exists(model_dir):
        os.makedirs(model_dir)

    model.save(model_path)

    print("Model saved successfully")
