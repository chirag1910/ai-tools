import os
from numpy import NaN
from pandas import read_csv
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from pickle import dump


if (__name__ == '__main__'):
    curr_path = os.path.dirname(os.path.abspath(__file__))
    dataset_path = os.path.join(
        curr_path, "..", "datasets", "heart_disease.csv")

    model_dir = os.path.join(
        curr_path, "saved_models", "heart_disease_predictor"
    )
    model_path = os.path.join(model_dir, "model.pickel")

    if not os.path.exists(dataset_path):
        raise Exception(f"{dataset_path} not found")

    df = read_csv(dataset_path)

    cols = df.columns.to_list()
    cols.remove("education")
    cols.remove("TenYearCHD")

    x = df.loc[:, cols]
    y = df["TenYearCHD"]

    mss = SimpleImputer(missing_values=NaN, strategy="mean")
    x = mss.fit_transform(x)

    lgr = LogisticRegression(solver='lbfgs', max_iter=5000)
    lgr.fit(x, y)

    print("Model created successfully")

    if not os.path.exists(model_dir):
        os.makedirs(model_dir)

    dump(lgr, open(model_path, "wb"))

    print("Model saved successfully")
