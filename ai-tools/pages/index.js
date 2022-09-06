import Head from "next/head";
import styles from "../styles/home.module.css";
import Link from "next/link";

const Home = () => {
    return (
        <>
            <Head>
                <title>AI Tools</title>
            </Head>

            <div className={styles.main}>
                <h1>AI - Tools</h1>
                <div className={styles.container}>
                    <Link href="/animal_classification">
                        <a>
                            <div className={styles.card}>
                                <p>Animals Classifier</p>
                            </div>
                        </a>
                    </Link>

                    <Link href="/spam_classification">
                        <a>
                            <div className={styles.card}>
                                <p>Spam Detector</p>
                            </div>
                        </a>
                    </Link>

                    <Link href="/heart_disease">
                        <a>
                            <div className={styles.card}>
                                <p>Heart Disease Predictor</p>
                            </div>
                        </a>
                    </Link>

                    <Link href="/ocr">
                        <a>
                            <div className={styles.card}>
                                <p>Optical Character Recognition</p>
                            </div>
                        </a>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Home;
