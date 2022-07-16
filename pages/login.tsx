import { yupResolver } from '@hookform/resolvers/yup';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useAuth } from '../provider/authUserContext';
import { handleError } from '../utils/firebase.js';

const schema = yup.object().shape({
  email: yup.string().email('Must have a valid Email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const defaultValues = {
  email: '',
  password: '',
};

const Login: NextPage = () => {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { signInWithEmailAndPassword } = useAuth();
  const router = useRouter();
  const [firebaseError, setFirebaseError] = useState<string>('');

  const onSubmit = async (data: typeof defaultValues) => {
    try {
      await signInWithEmailAndPassword(data.email, data.password);
      router.push('/');
    } catch (error: any) {
      setFirebaseError(handleError(error.message));
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black p-4">
      <div className="px-4 py-8 bg-tmrev-gray-dark rounded w-full max-w-2xl flex justify-center items-center">

        <form className="flex flex-col w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl font-semibold text-tmrev-alt-yellow">The Movie Review</h1>
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
    </div>
  );
};

export default Login;
