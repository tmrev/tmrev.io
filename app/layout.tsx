import '../styles/globals.css';
import 'react-loading-skeleton/dist/skeleton.css';

import { Open_Sans } from '@next/font/google';
import React from 'react';

import Navigation from './components/navigation';
import Provider from './components/provider';

// If loading a variable font, you don't need to specify the font weight
const openSans = Open_Sans({ subsets: ['latin'] });

function Layout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html className={openSans.className} lang="en">
      <head className="dark">
        <link href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp&display=swap"
          rel="stylesheet"
        />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link href="/site.webmanifest" rel="manifest" />
        <link color="#242424" href="/safari-pinned-tab.svg" rel="mask-icon" />
        <meta content="#242424" name="msapplication-TileColor" />
        <meta content="#242424" name="theme-color" />
      </head>
      <body className="text-white">
        <Provider>
          <Navigation>
            {children}
          </Navigation>
        </Provider>
      </body>
    </html>
  );
}

export default Layout;
