/* eslint-disable react/no-unescaped-entities */
import Document, {
  DocumentContext, Head, Html, Main, NextScript,
} from 'next/document';
import React from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html className="dark" lang="en">
        <Head>
          <link href="https://fonts.gstatic.com" rel="preconnect" />
          <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');
          </style>
          {/* <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
            rel="stylesheet"
          /> */}
          <link
            href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
