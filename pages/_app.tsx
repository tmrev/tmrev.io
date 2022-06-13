import '../styles/globals.css';

import type { AppProps } from 'next/app';
import React from 'react';

import { wrapper } from '../redux/store';
import Layout from './layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>

  );
}

export default wrapper.withRedux(MyApp);
