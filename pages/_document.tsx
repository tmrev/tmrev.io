/* eslint-disable react/no-unescaped-entities */
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html className='dark' lang='en'>
        <Head>
          <link href='https://fonts.gstatic.com' rel='preconnect' />
          <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');
          </style>
          <link
            href='https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp&display=swap'
            rel='stylesheet'
          />
          <link
            href='/apple-touch-icon.png'
            rel='apple-touch-icon'
            sizes='180x180'
          />
          <link
            href='/favicon-32x32.png'
            rel='icon'
            sizes='32x32'
            type='image/png'
          />
          <link
            href='/favicon-16x16.png'
            rel='icon'
            sizes='16x16'
            type='image/png'
          />
          <link href='/site.webmanifest' rel='manifest' />
          <link color='#242424' href='/safari-pinned-tab.svg' rel='mask-icon' />
          <meta content='#242424' name='msapplication-TileColor' />
          <meta content='#242424' name='theme-color' />
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
