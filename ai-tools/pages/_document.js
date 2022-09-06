import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
    return (
        <Html lang="en">
            <Head>
                <meta
                    name="keywords"
                    content="ai tools, artificial intelligence, image classification, spam classification, heart disease predictor, ocr, optical image recongnition"
                />

                <meta name="author" content="Chirag Goyal" />

                <meta property="twitter:title" content="AI Tools" />

                <meta
                    property="twitter:description"
                    content="Use multiple tools based on artificial intelligence like image classification, spam classification etc."
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;
