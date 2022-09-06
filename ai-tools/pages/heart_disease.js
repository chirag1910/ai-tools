import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/heart_disease.module.css";
import Loader from "../components/Loader";
import Api from "../utils/api";

const Heart_disease = () => {
    const [form, setForm] = useState(Array.from({ length: 14 }, () => ""));

    const [result, setResult] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        handleChange(3, form[2] == 0 ? 0 : form[3]);
    }, [form[2]]);

    const handleChange = (index, value) => {
        let temp = [...form];
        temp[index] = value;
        setForm(temp);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const finalData = form.map((v) => parseFloat(v || 0));

        const formData = new FormData();
        formData.append("data", finalData);

        const response = await new Api().predict_heart_disease(formData);

        if (response.status === "ok") {
            setResult(response.result == 1 ? "yes" : "no");
        } else {
            console.error(response.error);
            setResult("");
        }

        setLoading(false);
    };

    return (
        <>
            <Head>
                <title>Heart Disease Predictor · AI Tools</title>
            </Head>

            <div className={styles.main}>
                <div>
                    <h1>Heart Disease Predictor</h1>
                    <p>
                        Heart Disease Predictor can predict whether the person
                        will get any heart disease in next ten years or not
                        using Logistic Regression.
                    </p>
                </div>

                <div
                    className={[
                        styles.container,
                        result || loading ? styles.partition : undefined,
                    ].join(" ")}
                >
                    <div className={styles.left}>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className={styles.formControl}>
                                <label htmlFor="1">Gender</label>
                                <select
                                    id="1"
                                    value={form[0]}
                                    onChange={(e) =>
                                        handleChange(0, e.target.value)
                                    }
                                    required={true}
                                >
                                    <option value={0}>Male</option>
                                    <option value={1}>Female</option>
                                </select>
                            </div>

                            <div className={styles.formControl}>
                                <label htmlFor="2">Age</label>
                                <input
                                    id="2"
                                    type="number"
                                    value={form[1]}
                                    onChange={(e) =>
                                        handleChange(1, e.target.value)
                                    }
                                    required={true}
                                    placeholder="Age"
                                />
                            </div>

                            <div className={styles.formControl}>
                                <label htmlFor="3">Do you smoke?</label>
                                <select
                                    id="3"
                                    value={form[2]}
                                    onChange={(e) =>
                                        handleChange(2, e.target.value)
                                    }
                                    required={true}
                                >
                                    <option value={0}>No</option>
                                    <option value={1}>Yes</option>
                                </select>
                            </div>

                            {form[2] == 1 && (
                                <div className={styles.formControl}>
                                    <label htmlFor="4">Cigs per day</label>
                                    <input
                                        id="4"
                                        type="number"
                                        value={form[3]}
                                        onChange={(e) =>
                                            handleChange(3, e.target.value)
                                        }
                                        required={true}
                                        placeholder="Cigarettes per day"
                                    />
                                </div>
                            )}

                            <div className={styles.formControl}>
                                <label htmlFor="5">
                                    Do you take any blood pressure medicines?
                                </label>
                                <select
                                    id="5"
                                    value={form[4]}
                                    onChange={(e) =>
                                        handleChange(4, e.target.value)
                                    }
                                    required={true}
                                >
                                    <option value={0}>No</option>
                                    <option value={1}>Yes</option>
                                </select>
                            </div>

                            <div className={styles.formControl}>
                                <label htmlFor="6">
                                    Ever had a heart stroke?
                                </label>
                                <select
                                    id="6"
                                    value={form[5]}
                                    onChange={(e) =>
                                        handleChange(5, e.target.value)
                                    }
                                    required={true}
                                >
                                    <option value={0}>No</option>
                                    <option value={1}>Yes</option>
                                </select>
                            </div>

                            <div className={styles.formControl}>
                                <label htmlFor="7">
                                    Ever been hypertensive?
                                </label>
                                <select
                                    id="7"
                                    value={form[6]}
                                    onChange={(e) =>
                                        handleChange(6, e.target.value)
                                    }
                                    required={true}
                                >
                                    <option value={0}>No</option>
                                    <option value={1}>Yes</option>
                                </select>
                            </div>

                            <div className={styles.formControl}>
                                <label htmlFor="8">Are you diabetic?</label>
                                <select
                                    id="8"
                                    value={form[7]}
                                    onChange={(e) =>
                                        handleChange(7, e.target.value)
                                    }
                                    required={true}
                                >
                                    <option value={0}>No</option>
                                    <option value={1}>Yes</option>
                                </select>
                            </div>

                            <div className={styles.formControl}>
                                <label htmlFor="9">
                                    Total cholesterol level
                                </label>
                                <input
                                    id="9"
                                    type="number"
                                    value={form[8]}
                                    onChange={(e) =>
                                        handleChange(8, e.target.value)
                                    }
                                    required={true}
                                    placeholder="Normal: Less than 200 mg/dL"
                                />
                            </div>

                            <div className={styles.formControl}>
                                <label htmlFor="10">
                                    Systolic blood pressure
                                </label>
                                <input
                                    id="10"
                                    type="number"
                                    value={form[9]}
                                    onChange={(e) =>
                                        handleChange(9, e.target.value)
                                    }
                                    required={true}
                                    placeholder="Normal: 120"
                                />
                            </div>

                            <div className={styles.formControl}>
                                <label htmlFor="11">
                                    Diastolic blood pressure
                                </label>
                                <input
                                    id="11"
                                    type="number"
                                    value={form[10]}
                                    onChange={(e) =>
                                        handleChange(10, e.target.value)
                                    }
                                    required={true}
                                    placeholder="Normal: 80"
                                />
                            </div>

                            <div className={styles.formControl}>
                                <label htmlFor="12">BMI</label>
                                <input
                                    id="12"
                                    type="number"
                                    value={form[11]}
                                    onChange={(e) =>
                                        handleChange(11, e.target.value)
                                    }
                                    required={true}
                                    placeholder="Normal: 18.5 - 24.9"
                                />
                            </div>

                            <div className={styles.formControl}>
                                <label htmlFor="13">Resting heart rate</label>
                                <input
                                    id="13"
                                    type="number"
                                    value={form[12]}
                                    onChange={(e) =>
                                        handleChange(12, e.target.value)
                                    }
                                    required={true}
                                    placeholder="Normal: 60 to 100 beats per minute"
                                />
                            </div>

                            <div className={styles.formControl}>
                                <label htmlFor="14">Glucose level</label>
                                <input
                                    id="14"
                                    type="number"
                                    value={form[13]}
                                    onChange={(e) =>
                                        handleChange(13, e.target.value)
                                    }
                                    required={true}
                                    placeholder="Normal: 0 mg/dL - 100 mg/dL"
                                />
                            </div>

                            <button type="submit" disabled={loading}>
                                Check
                            </button>
                        </form>
                    </div>

                    {(result || loading) && (
                        <div
                            className={[
                                styles.right,
                                loading ? styles.loading : undefined,
                            ].join(" ")}
                        >
                            {loading ? (
                                <>
                                    <div className={styles.loading}>
                                        <Loader />
                                        <p>Predicting...</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {result == "no" ? (
                                        <p>
                                            You are <span>fit</span> for next
                                            ten years!
                                        </p>
                                    ) : (
                                        <p>
                                            You{" "}
                                            <span className={styles.yes}>
                                                might get
                                            </span>{" "}
                                            heart disease in next ten years!
                                        </p>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Heart_disease;
