import axios from 'axios';
import {
  createUserWithEmailAndPassword as createEmailPassword,
  getAuth,
  GoogleAuthProvider,
  signInAnonymously as signAnonymously,
  signInWithEmailAndPassword as signEmailPassword,
  signInWithPopup,
  User,
} from 'firebase/auth';
import { getMessaging, getToken, isSupported, onMessage } from "firebase/messaging";
import nookies from 'nookies';
import { useEffect, useState } from 'react';

import { app } from '@/config/firebaseInit';

export default function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const authStateChanged = async (authState: User | null) => {
    if (!authState) {
      setUser(null);
      setLoading(false);
      nookies.set(undefined, 'token', '', { path: '/' });
    } else {
      setLoading(true);
      setUser(authState);
      const token = await authState.getIdToken();
      nookies.set(undefined, 'token', token, { path: '/' });
      setLoading(false);
    }
  };

  const clear = () => {
    setUser(null);
    setLoading(true);
  };

  useEffect(() => {
    const handle = setInterval(async () => {
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, [user]);

  const messaging = (async () => {
    try {
      const isSupportedBrowser = await isSupported();
      if (isSupportedBrowser) {
        return getMessaging(app);
      }
      return null;
    } catch (err) {
      return null;
    }
  })();

  const onMessageListener = async () => (
    new Promise((resolve) => (
      // eslint-disable-next-line no-promise-executor-return
      async () => {
        const messageResolve = await messaging

        if (!messageResolve) return

        onMessage(messageResolve, (payload) => {
          // eslint-disable-next-line no-console
          console.log(payload, 'message payload')
          resolve(payload)
        })
      }
    ))
  )

  const generateToken = async () => {
    if (!user) return

    try {
      const message = await messaging

      if (!message) return

      const token = await getToken(message, { vapidKey: process.env.NEXT_PUBLIC_VAPIDKEY })
      const authToken = await user.getIdToken()

      if (token) {
        axios.post(`${process.env.NEXT_PUBLIC_TMREV_API}/user/device`, {
          deviceToken: token,
          userId: user.uid
        }, {
          headers: {
            authorization: authToken
          }
        })
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  function requestPermission() {

    if (Notification.permission === 'granted') generateToken()

    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        generateToken()
      }
    })
  }

  useEffect(() => {
    requestPermission()
  }, [user])


  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

  const createUserWithEmailAndPassword = (email: string, password: string) => (
    createEmailPassword(auth, email, password));

  const signInWithEmailAndPassword = (email: string, password: string) => (
    signEmailPassword(auth, email, password));

  const signInAnonymously = () => signAnonymously(auth);

  const signOut = () => auth.signOut().then(clear);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);

    return () => unsubscribe();
  }, [auth]);

  return {
    createUserWithEmailAndPassword,
    loading,
    onMessageListener,
    signInAnonymously,
    signInWithEmailAndPassword,
    signInWithGoogle,
    signOut,
    user
  };
}
