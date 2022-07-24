import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React, { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAppDispatch } from '../../hooks';
import { useAuth } from '../../provider/authUserContext';
import { setClearModal } from '../../redux/slice/modalSlice';
import { handleError } from '../../utils/firebase';
import Button from '../common/Button';
import Input from '../common/Input';

interface Props {
  isModal: boolean
  redirectPath: string
}

const schema = yup.object().shape({
  email: yup.string().email('Must have a valid Email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const defaultValues = {
  email: '',
  password: '',
};

const LoginPanel:FunctionComponent<Props> = ({ isModal, redirectPath }:Props) => {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();
  const { signInWithEmailAndPassword, signInWithGoogle } = useAuth();
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
      await signInWithGoogle();
      handleAction();
    } catch (error: any) {
      setFirebaseError(handleError(error.message));
    }
  };

  return (
    <div className="px-4 py-8 bg-gray-100 dark:bg-tmrev-gray-dark rounded w-full max-w-2xl flex justify-center items-center">
      <form className="flex flex-col w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-3xl font-semibold text-tmrev-alt-yellow">The Movie Review (Login)</h1>
        <Button onClick={onGoogle}>Login With Google</Button>
        <Input
          className="px-3 py-1 border rounded"
          {...register('email')}
          error={errors.email}
          placeholder="Email"
          type="email"
        />
        <Input error={errors.password} {...register('password')} placeholder="Password" type="password" />
        <Button type="submit" variant="primary">Login</Button>
        {firebaseError && (
          <p className="text-red-500 mt-1">{firebaseError}</p>
        )}
      </form>
    </div>
  );
};

export default LoginPanel;
