import '../styles/globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import '../config/firebaseInit';

import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import React from 'react';

import Modal from '../components/common/Modal';
import { AuthUserProvider } from '../provider/authUserContext';
import { wrapper } from '../redux/store';
import Layout from './layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthUserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Modal />
      </AuthUserProvider>
      <NextNProgress color="#FFC000" />
    </>

  );
}

export default wrapper.withRedux(MyApp);
