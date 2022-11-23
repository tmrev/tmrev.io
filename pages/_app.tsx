import '../styles/globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import '../config/firebaseInit';

import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import React from 'react';

import Modal from '../components/common/Modal';
import Toast from '../components/common/Toast';
import Navigation from '../components/navigation';
import { AuthUserProvider } from '../provider/authUserContext';
import { wrapper } from '../redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthUserProvider>
        <div className="flex flex-row">
          <Navigation />
          <Component {...pageProps} />
        </div>
        <Modal />
      </AuthUserProvider>
      <NextNProgress color="#FFC000" />
      <Toast />
    </>

  );
}

export default wrapper.withRedux(MyApp);
