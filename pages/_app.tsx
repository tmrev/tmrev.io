import '../styles/globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import '../config/firebaseInit';
import 'react-tooltip/dist/react-tooltip.css'

import type { AppProps } from 'next/app';
import Script from 'next/script';
import NextNProgress from 'nextjs-progressbar';
import React, { useEffect, useRef } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip'

import Modal from '@/components/common/Modal';
import Toast from '@/components/common/Toast';
import Navigation from '@/components/navigation';
import usePushNotification from '@/hooks/usePushNotification';
import useScroll from '@/hooks/useScroll';
import { AuthUserProvider } from '@/provider/authUserContext';
import ScrollProvider from '@/provider/scrollContext';
import { wrapper } from '@/redux/store';

function App({children, divRef}: any) {
  const { setDivRef } = useScroll()
  usePushNotification()

  useEffect(() => {
    setDivRef(divRef)
  }, [divRef])

  return children
}

function MyApp({ Component, pageProps }: AppProps) {
  const divRef = useRef<HTMLDivElement>(null)


  return (
    <>
      <AuthUserProvider>
        <ScrollProvider>
          <App divRef={divRef}>
            <div className="w-full flex flex-col max-h-screen">
              <Navigation />
              <div ref={divRef} className='w-full h-full overflow-auto'>
                <Component {...pageProps} />
              </div>
            </div>
          </App>
        </ScrollProvider>
        <Modal />
      </AuthUserProvider>
      <NextNProgress color="#FFC000" />
      <Toast />
      <ReactTooltip id="my-tooltip" />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      {/* eslint-disable-next-line react/no-danger */}
      <script
        dangerouslySetInnerHTML={{
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
