import '../styles/globals.css';
import 'react-loading-skeleton/dist/skeleton.css';

import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import React from 'react';

import { wrapper } from '../redux/store';
import Layout from './layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <NextNProgress color="#FFC000" />
    </>

  );
}

export default wrapper.withRedux(MyApp);
