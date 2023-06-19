import axios, { AxiosResponse } from 'axios';
import {
  createUserWithEmailAndPassword as createEmailPassword,
  getAuth,
  GoogleAuthProvider,
  signInAnonymously as signAnonymously,
  signInWithEmailAndPassword as signEmailPassword,
  signInWithPopup,
  User,
} from 'firebase/auth';
import nookies from 'nookies';
import { useCallback, useEffect, useState } from 'react';

import { TmrevUser } from '@/models/tmrev/user';
import { useRetrieveNotificationsQuery } from '@/redux/api';

const handleFetchUser = async (uid: string) => {

  const response: AxiosResponse<TmrevUser> = await axios.get(`${process.env.NEXT_PUBLIC_TMREV_API}/user/${uid}`)

  return response.data
}

export default function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [tmrevUser, setTmrevUser] = useState<TmrevUser | null>(null)
  const [token, setToken] = useState<string>("")
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const {
    data: notificationData,
    isFetching: isNotificationLoading
  } = useRetrieveNotificationsQuery({ authToken: token }, { pollingInterval: 300000, skip: !token })

  const handleTmrevUser = useCallback(async () => {
    if (!user) return

    const data = await handleFetchUser(user.uid)

    setTmrevUser(data)
  }, [user])

  useEffect(() => {
    handleTmrevUser()
  }, [handleTmrevUser])

  const authStateChanged = useCallback(async (authState: User | null) => {
    if (!authState) {
      setUser(null);
      setLoading(false);
      setToken("")
      nookies.set(undefined, 'token', '', { path: '/' });
    } else {
      setLoading(true);
      setUser(authState);
      const refreshedToken = await authState.getIdToken();
      setToken(refreshedToken)
      nookies.set(undefined, 'token', refreshedToken, { path: '/' });
      setLoading(false);
    }
  }, []);

  const clear = () => {
    setUser(null);
    setLoading(true);
  };

  useEffect(() => {
    const handle = setInterval(async () => {
      if (user) {
        const refreshedToken = await user.getIdToken(true);
        setToken(refreshedToken)
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, [user]);

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
    notification: {
      data: notificationData,
      isLoading: isNotificationLoading
    },
    signInAnonymously,
    signInWithEmailAndPassword,
    signInWithGoogle,
    signOut,
    tmrevUser,
    user
  };
}
