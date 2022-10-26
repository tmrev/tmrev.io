'use client';

import '../../config/firebaseInit';

import NextNProgress from 'nextjs-progressbar';
import React from 'react';

import { AuthUserProvider } from '../../provider/authUserContext';

export default function Provider({ children }: {
  children: React.ReactNode;
}) {
  return (
    <AuthUserProvider>
      {children}
      <NextNProgress color="#FFC000" />
    </AuthUserProvider>
  );
}
