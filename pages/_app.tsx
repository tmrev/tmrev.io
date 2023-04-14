import '../styles/globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import '../config/firebaseInit';

import type { AppProps } from 'next/app';
import Script from 'next/script';
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
        <div className="flex flex-row w-full">
          <Navigation />
          <Component {...pageProps} />
        </div>
        <Modal />
      </AuthUserProvider>
      <NextNProgress color="#FFC000" />
      <Toast />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      {/* eslint-disable-next-line react/no-danger */}
      <script dangerouslySetInnerHTML={{
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS});`,
      }}
      />
    </>
  );
}

export default wrapper.withRedux(MyApp);
