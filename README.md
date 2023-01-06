# AI tools

**Project contains multiple AI Tools which are:**

-   Animal (image) classification
-   Spam classification
-   Heart disease predictor
-   Image OCR

**Frameworks used:**

-   Django
-   NextJs

## Getting started - First way

1.  Download prebuild models from [here](https://drive.google.com/file/d/1daOIrIP5ZQ4JSnTZaYPCrHUehPvlg41L/view?usp=sharing) and extract it.

2.  Move the extracted `saved_models` folder at location `api\api\saved_models` as per the project structure.

## Getting started - Second way

1.  Download all the datasets and place them in `datasets` folder as per project structure.

    -   [animals](https://www.kaggle.com/datasets/alessiocorrado99/animals10)
    -   [heart_disease.csv](https://www.kaggle.com/datasets/dileep070/heart-disease-prediction-using-logistic-regression)
    -   [spam.csv](https://www.kaggle.com/datasets/owaisraza009/spam-messages)

2.  Go to model-builders directory

    ```bash
      cd model-builders
    ```

3.  Install dependencies

    ```bash
      pip install -r requirements.txt
    ```

4.  Run all the scripts in `model-builders` to build models.

5.  Move the automatically created `model-builders\saved_models` at `api\api\saved_models` as per the project structure.

## Run Locally

### API

1.  Go to the project directory

    ```bash
      cd api
    ```

2.  Install tesseract using windows installer available [here](https://github.com/UB-Mannheim/tesseract/wiki)

3.  Update the installed `tesseract.exe` path in `api\api\workers\ocr_worker.py`

4.  Install other dependencies

    ```bash
      pip install -r requirements.txt
    ```

5.  Start the server

    ```bash
      manage.py runserver
    ```

### Website

1.  Go to the project directory

    ```bash
      cd ai-tools
    ```

2.  Install dependencies

    ```bash
      npm i
    ```

3.  Start the server

    ```bash
      npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) on your browser to see the result.

## Project Structure

```
ai-tools
├───ai-tools
│
├───api
│   └───api
│       └───saved_models
│           ├───heart_disease_predictor
│           ├───image_classifier
│           └───spam_classifier
│
├───datasets
│   │   heart_disease.csv
│   │   spam.csv
│   └───animals
│
└───model-builders
```

## Authors

-   [@chirag](https://github.com/chirag1910)
-   [@anshpreet](https://github.com/Ansh-3101)
