/* eslint-disable no-unused-vars */
import { User, UserCredential } from 'firebase/auth';
import React, { createContext, useContext } from 'react';

import useFirebaseAuth from '@/hooks/userAuth';

interface AuthUserContext {
  user: User | null;
  loading: boolean;
}

interface Auth {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  createUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<UserCredential>;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<UserCredential>;
  signInAnonymously: () => Promise<UserCredential>;
  signInWithGoogle: () => Promise<UserCredential>;
  deviceToken: string | null
}

const authUserContext = createContext<AuthUserContext>({
  loading: true,
  user: null,
});

export function AuthUserProvider({ children }: any) {
  const auth = useFirebaseAuth();

  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}

export const useAuth = () => useContext(authUserContext) as Auth;
