import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100;0,400;0,500;1,100;1,200;1,300&display=swap"
          rel="stylesheet"
        />{" "}
      </Head>
      <body className="overflow-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
