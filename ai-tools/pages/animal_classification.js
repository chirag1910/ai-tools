import Head from "next/head";
import DropZone from "../components/DropZone";
import { FileUploader } from "react-drag-drop-files";
import { useState, useEffect } from "react";
import styles from "../styles/animal_classification.module.css";
import Loader from "../components/Loader";
import Api from "../utils/api";

const Animal_classification = () => {
    const [file, setFile] = useState(null);
    const [img, setImg] = useState(null);

    const [result, setResult] = useState(null);

    const fileTypes = ["JPG", "PNG", "JPEG", "WEBP"];

    useEffect(() => {
        if (file) {
            setResult(null);
            const objectUrl = URL.createObjectURL(file);
            setImg(objectUrl);
            handleApiCall();

            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [file]);

    const handleApiCall = async () => {
        const formData = new FormData();
        formData.append("file", file);
        const response = await new Api().classify_image(formData);

        if (response.status === "ok") {
            setResult([response.result.class, response.result.confidence]);
        } else {
            console.error(response.error);
            setFile(null);
        }
    };

    const handleChange = (f) => {
        setFile(f);
    };

    return (
        <>
            <Head>
                <title>Animal Classification · AI Tools</title>
            </Head>

            <div className={styles.main}>
                <div>
                    <h1>Animal Image Classification</h1>
                    <p>
                        Animal image classifier can classify images among 10
                        groups which are dog, horse, elephant, butterfly,
                        chicken, cat, cow, sheep, spider, and squirrel.
                    </p>
                </div>

                <div
                    className={[
                        styles.container,
                        file ? styles.partition : undefined,
                    ].join(" ")}
                >
                    <div
                        className={[
                            styles.left,
                            !file ? styles.animate : undefined,
                        ].join(" ")}
                    >
                        {!file ? (
                            <FileUploader
                                handleChange={handleChange}
                                name="file"
                                types={fileTypes}
                                minSize={0}
                            >
                                <DropZone />
                            </FileUploader>
                        ) : (
                            <img src={img} alt="Uploaded image" />
                        )}
                    </div>

                    {file && (
                        <div
                            className={[
                                styles.right,
                                !result ? styles.loading : undefined,
                            ].join(" ")}
                        >
                            {result ? (
                                <>
                                    <p>
                                        This animal is a{" "}
                                        <span>{result[0]}</span>.
                                    </p>
                                    <div className={styles.confidence}>
                                        <div
                                            className={styles.bar}
                                            style={{ width: result[1] + "%" }}
                                        />
                                        <p>
                                            Confidence: {result[1].toFixed(2)}%
                                        </p>
                                    </div>
                                    <FileUploader
                                        handleChange={handleChange}
                                        name="file"
                                        types={fileTypes}
                                        minSize={0}
                                    >
                                        <p className={styles.button}>
                                            Predict Another
                                        </p>
                                    </FileUploader>
                                </>
                            ) : (
                                <>
                                    <div className={styles.loading}>
                                        <Loader />
                                        <p>Predicting...</p>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Animal_classification;
