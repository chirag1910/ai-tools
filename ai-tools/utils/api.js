class Api {
    constructor() {
        this.apiBaseUrl = "http://127.0.0.1:8000/";
    }

    classify_image = async (formdata) => {
        try {
            const res = await fetch(this.apiBaseUrl + "classify_image/", {
                method: "POST",
                headers: {
                    accept: "application/json",
                },
                mode: "cors",
                body: formdata,
            });

            const data = await res.json();

            return data;
        } catch (err) {
            return {
                status: "error",
                error: "Some error occurred, please try again later",
            };
        }
    };

    classify_spam = async (formData) => {
        try {
            const res = await fetch(this.apiBaseUrl + "classify_spam/", {
                method: "POST",
                headers: {
                    accept: "application/json",
                },
                mode: "cors",
                body: formData,
            });

            const data = await res.json();

            return data;
        } catch (err) {
            return {
                status: "error",
                error: "Some error occurred, please try again later",
            };
        }
    };

    predict_heart_disease = async (formData) => {
        try {
            const res = await fetch(this.apiBaseUrl + "heart_disease/", {
                method: "POST",
                headers: {
                    accept: "application/json",
                },
                mode: "cors",
                body: formData,
            });

            const data = await res.json();

            return data;
        } catch (err) {
            return {
                status: "error",
                error: "Some error occurred, please try again later",
            };
        }
    };

    ocr = async (formdata) => {
        try {
            const res = await fetch(this.apiBaseUrl + "ocr/", {
                method: "POST",
                headers: {
                    accept: "application/json",
                },
                mode: "cors",
                body: formdata,
            });

            const data = await res.json();

            return data;
        } catch (err) {
            return {
                status: "error",
                error: "Some error occurred, please try again later",
            };
        }
    };
}

export default Api;
