import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAppDispatch } from '../../hooks';
import { useAuth } from '../../provider/authUserContext';
import { tmrevAPI } from '../../redux/api';
import {
  Content,
  setClearModal,
  setModalContent,
  setOpenModal,
} from '../../redux/slice/modalSlice';
import { handleError } from '../../utils/firebase';
import Button from '../common/Button';
import Input from '../common/Input';
import HeaderText from '../common/typography/headerText';
import RegisterPanel, { createTMREVAccount } from '../register';

interface Props {
  isModal: boolean;
  redirectPath: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Must have a valid Email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

const defaultValues = {
  email: '',
  password: '',
};

const LoginPanel: FunctionComponent<Props> = ({
  isModal,
  redirectPath,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();
  const { signInWithEmailAndPassword, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [firebaseError, setFirebaseError] = useState<string>('');

  const findUserByUid = async (uid: string) => {
    const res = await fetch(`${tmrevAPI}/user/isUser/${uid}`);
    const data = await res.json();

    return data;
  };

  const handleAction = () => {
    if (isModal) {
      dispatch(setClearModal());
      router.push(redirectPath);
    } else {
      router.push(redirectPath);
    }
  };

  const openRegisterModal = () => {
    const content: Content = {
      children: (
        <RegisterPanel isModal redirectPath={`${router.asPath}/review`} />
      ),
      closeFunc: () => dispatch(setOpenModal(false)),
      description: 'enorder to review a movie on trmev you need to login',
      outsideClick: true,
      title: 'Please Login to review',
    };

    dispatch(setOpenModal(true));
    dispatch(setModalContent(content));
  };

  const onSubmit = async (data: typeof defaultValues) => {
    try {
      await signInWithEmailAndPassword(data.email, data.password);
      handleAction();
    } catch (error: any) {
      setFirebaseError(handleError(error.message));
    }
  };

  const onGoogle = async () => {
    try {
      const { user } = await signInWithGoogle();
      handleAction();
      const dbUser = await findUserByUid(user.uid);
      if (!dbUser) {
        await createTMREVAccount(user);
      }
      handleAction();
    } catch (error: any) {
      setFirebaseError(handleError(error.message));
    }
  };

  return (
    <div className="px-4 py-8 bg-gray-100 dark:bg-tmrev-gray-dark rounded w-full max-w-2xl flex justify-center items-center">
      <form
        className="flex flex-col w-full space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <HeaderText headingType="h1">The Movie Review (Login)</HeaderText>
        <Button onClick={onGoogle}>Login With Google</Button>
        <Input
          className="px-3 py-1 border rounded"
          {...register('email')}
          error={errors.email}
          placeholder="Email"
          type="email"
        />
        <Input
          error={errors.password}
          {...register('password')}
          placeholder="Password"
          type="password"
        />
        <Button type="submit" variant="primary">
          Login
        </Button>
        {firebaseError && <p className="text-red-500 mt-1">{firebaseError}</p>}
        {!isModal ? (
          <Link passHref className="w-full text-center text-blue-400" href="/register">
            <p>Need an account?</p>
          </Link>
        ) : (
          <Button
            className="w-full text-center hover:no-underline "
            onClick={openRegisterModal}
          >
            <p className="text-blue-400">Need an account?</p>
          </Button>
        )}
      </form>
    </div>
  );
};

export default LoginPanel;
