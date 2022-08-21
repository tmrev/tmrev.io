import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { User } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAppDispatch } from '../../hooks';
import { useAuth } from '../../provider/authUserContext';
import { tmrevAPI } from '../../redux/api';
import {
  Content, setClearModal, setModalContent, setOpenModal,
} from '../../redux/slice/modalSlice';
import { extractNameFromDisplayName } from '../../utils/common';
import { handleError } from '../../utils/firebase';
import Button from '../common/Button';
import Input from '../common/Input';
import HeaderText from '../common/typography/headerText';
import LoginPanel from '../login';

interface Props {
  isModal: boolean
  redirectPath: string
}

const schema = yup.object().shape({
  email: yup.string().email('Must have a valid Email').required('Email is required'),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  password: yup.string().required('Password is required'),
});

const defaultValues = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
};

export const createTMREVAccount = async (user: User, data?: typeof defaultValues) => {
  const names = extractNameFromDisplayName(user.displayName);
  const token = await user.getIdToken();

  await axios.post(`${tmrevAPI}/user`, {
    email: user.email,
    firstName: names?.firstName || data?.firstName || '',
    lastName: names?.lastName || data?.lastName || '',
    uuid: user.uid,
  }, {
    headers: {
      Authorization: token,
    },
  });
};

const RegisterPanel: FunctionComponent<Props> = ({ isModal, redirectPath }: Props) => {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();
  const { signInWithGoogle, createUserWithEmailAndPassword } = useAuth();
  const router = useRouter();
  const [firebaseError, setFirebaseError] = useState<string>('');

  const handleAction = () => {
    if (isModal) {
      dispatch(setClearModal());
      router.push(redirectPath);
    } else {
      router.push(redirectPath);
    }
  };

  const openLoginModal = () => {
    const content:Content = {
      children: <LoginPanel isModal redirectPath={`${router.asPath}/review`} />,
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
      const { user } = await createUserWithEmailAndPassword(data.email, data.password);
      await createTMREVAccount(user, data);
      handleAction();
    } catch (error: any) {
      setFirebaseError(handleError(error.message));
    }
  };

  const onGoogle = async () => {
    try {
      const { user } = await signInWithGoogle();
      await createTMREVAccount(user);
      handleAction();
    } catch (error: any) {
      setFirebaseError(handleError(error.message));
    }
  };

  return (
    <div className="px-4 py-8 bg-gray-100 dark:bg-tmrev-gray-dark rounded w-full max-w-2xl flex justify-center items-center">
      <form className="flex flex-col w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <HeaderText headingType="h1">The Movie Review (Register)</HeaderText>
        <Button onClick={onGoogle}>Create an account with Google</Button>
        <div className="flex space-x-4">
          <Input
            className="px-3 py-1 border rounded"
            {...register('firstName')}
            error={errors.firstName}
            placeholder="First Name"
            type="name"
          />
          <Input
            className="px-3 py-1 border rounded"
            {...register('lastName')}
            error={errors.lastName}
            placeholder="Last Name"
            type="family-name"
          />
        </div>
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
          autoComplete="new-password"
          placeholder="Password"
          type="password"
        />
        <Button type="submit" variant="primary">Register</Button>
        {firebaseError && (
          <p className="text-red-500 mt-1">{firebaseError}</p>
        )}
        {!isModal ? (
          <Link passHref href="/login">
            <a className="w-full text-center text-blue-400">
              <p>All ready have an account?</p>
            </a>
          </Link>
        ) : (
          <Button className="w-full text-center hover:no-underline " onClick={openLoginModal}>
            <p className="text-blue-400">All ready have an account?</p>
          </Button>
        )}
      </form>
    </div>
  );
};

export default RegisterPanel;
