import Head from "next/head";
import DropZone from "../components/DropZone";
import { FileUploader } from "react-drag-drop-files";
import { useState, useEffect } from "react";
import styles from "../styles/ocr.module.css";
import Loader from "../components/Loader";
import Api from "../utils/api";

const Ocr = () => {
    const [file, setFile] = useState(null);
    const [img, setImg] = useState(null);

    const [result, setResult] = useState("");

    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const fileTypes = ["JPG", "PNG", "JPEG", "WEBP"];

    useEffect(() => {
        if (file) {
            setLoading(true);
            const objectUrl = URL.createObjectURL(file);
            setImg(objectUrl);
            handleApiCall();

            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [file]);

    const handleApiCall = async () => {
        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);
        const response = await new Api().ocr(formData);

        if (response.status === "ok") {
            if (response.result) {
                setResult(response.result);
            } else {
                setResult(null);
            }
        } else {
            console.error(response.error);
            setFile(null);
        }

        setLoading(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    const handleChange = (f) => {
        setFile(f);
    };

    return (
        <>
            <Head>
                <title>Optical Character Recognition · AI Tools</title>
            </Head>

            <div className={styles.main}>
                <div>
                    <h1>Optical Character Recognition</h1>
                    <p>
                        Optical Character Recognition can recongize text from a
                        digital image and serve it as a string.
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
                            !file ? styles.empty : undefined,
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
                                loading ? styles.loading : undefined,
                                !result ? styles.empty : undefined,
                            ].join(" ")}
                        >
                            {!loading ? (
                                <>
                                    <p>
                                        {result ? (
                                            result.split("\n").map((str) => (
                                                <>
                                                    <p>{str}</p>
                                                </>
                                            ))
                                        ) : (
                                            <span>No text found</span>
                                        )}
                                    </p>

                                    <button
                                        type="button"
                                        disabled={!result}
                                        onClick={handleCopy}
                                    >
                                        {copied ? "Copied" : "Copy"}
                                    </button>

                                    <FileUploader
                                        handleChange={handleChange}
                                        name="file"
                                        types={fileTypes}
                                        minSize={0}
                                    >
                                        <button
                                            type="button"
                                            disabled={loading}
                                        >
                                            Predict Another
                                        </button>
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

export default Ocr;
