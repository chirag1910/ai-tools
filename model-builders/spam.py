import os
from pandas import read_csv
from pickle import dump
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import BernoulliNB
from string import punctuation
from nltk.corpus import stopwords as stopwords_
stopwords = stopwords_.words("english")


def preprocess_text(s):
    s = [char.lower() for char in s if char not in punctuation]
    s = "".join(s)
    return [word for word in s.split(' ') if word not in stopwords]


if (__name__ == '__main__'):
    curr_path = os.path.dirname(os.path.abspath(__file__))
    dataset_path = os.path.join(curr_path, "..", "datasets", "spam.csv")

    model_dir = os.path.join(curr_path, "saved_models", "spam_classifier")
    vector_path = os.path.join(model_dir, "vector.pickle")
    model_path = os.path.join(model_dir, "model.pickel")

    if not os.path.exists(dataset_path):
        raise Exception(f"{dataset_path} not found")

    df = read_csv(dataset_path)
    cv = CountVectorizer(analyzer=preprocess_text)
    cv.fit(df.email)

    x = cv.transform(df.email).toarray()
    y = df.label

    bnb = BernoulliNB()
    bnb.fit(x, y)

    print("Model created successfully")

    if not os.path.exists(model_dir):
        os.makedirs(model_dir)

    dump(cv, open(vector_path, "wb"))
    dump(bnb, open(model_path, "wb"))

    print("Model saved successfully")
