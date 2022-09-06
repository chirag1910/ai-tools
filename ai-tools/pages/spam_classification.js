import Head from "next/head";
import { useState } from "react";
import styles from "../styles/spam_classification.module.css";
import Loader from "../components/Loader";
import Api from "../utils/api";

const Spam_classification = () => {
    const [text, setText] = useState("");

    const [result, setResult] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("message", text);

        const response = await new Api().classify_spam(formData);

        if (response.status === "ok") {
            setResult(response.result);
        } else {
            console.error(response.error);
            setResult("");
        }

        setLoading(false);
    };

    return (
        <>
            <Head>
                <title>Spam Classification · AI Tools</title>
            </Head>

            <div className={styles.main}>
                <div>
                    <h1>Spam Detector</h1>
                    <p>
                        Spam Detector can detect whether the message is spam or
                        not using Bernoulli Navie Bayse algorithm.
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
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                autoFocus={true}
                                placeholder="Enter you message here..."
                            />

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
                                        <p>Detecting...</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p>
                                        This is{" "}
                                        <span
                                            className={
                                                result === "spam"
                                                    ? styles.spam
                                                    : undefined
                                            }
                                        >
                                            {result === "spam"
                                                ? "a spam"
                                                : "not a spam"}
                                        </span>{" "}
                                        message.
                                    </p>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Spam_classification;
