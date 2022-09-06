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

Go to the project directory

```bash
  cd api
```

Install dependencies

```bash
  pip install -r requirements.txt
```

Start the server

```bash
  manage.py runserver
```

### Website

Go to the project directory

```bash
  cd ai-tools
```

Install dependencies

```bash
  npm i
```

Start the server

```bash
  npm run dev
```

Open [http://localhost:3000](http://localhost:3000) on your browser to see the result.

## Project Structure

```
ai-tools
│   .gitignore
│   LICENSE
│   README.md
│
├───ai-tools
│   │   .eslintrc.json
│   │   .gitignore
│   │   next.config.js
│   │   package-lock.json
│   │   package.json
│   │
│   ├───components
│   │       DropZone.js
│   │       Loader.js
│   │
│   ├───pages
│   │       animal_classification.js
│   │       heart_disease.js
│   │       index.js
│   │       ocr.js
│   │       spam_classification.js
│   │       _app.js
│   │       _document.js
│   │
│   ├───public
│   │       background.svg
│   │       background_2.svg
│   │       background_3.svg
│   │       background_4.svg
│   │       background_5.svg
│   │       favicon.ico
│   │
│   ├───styles
│   │       animal_classification.module.css
│   │       drop_capture.module.css
│   │       globals.css
│   │       heart_disease.module.css
│   │       home.module.css
│   │       loader.module.css
│   │       ocr.module.css
│   │       spam_classification.module.css
│   │
│   └───utils
│           api.js
│
├───api
│   │   .gitignore
│   │   db.sqlite3
│   │   manage.py
│   │   requirements.txt
│   │
│   └───api
│       │   asgi.py
│       │   settings.py
│       │   urls.py
│       │   views.py
│       │   wsgi.py
│       │   __init__.py
│       │
│       ├───saved_models
│       │   ├───heart_disease_predictor
│       │   ├───image_classifier
│       │   └───spam_classifier
│       │
│       └───workers
│               heart_disease_predictor.py
│               image_classifier.py
│               main.py
│               ocr_worker.py
│               spam_classifier.py
│
├───datasets
│   │   heart_disease.csv
│   │   spam.csv
│   └───animals
│
└───model-builders
        heart_disease.py
        image_classifier.py
        requirements.txt
        spam.py
```

## Authors

-   [@chirag](https://github.com/chirag1910)
-   [@anshpreet](https://github.com/Ansh-3101)
-   [@paras](https://github.com/qJNC)
