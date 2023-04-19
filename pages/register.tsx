import { NextPage } from 'next';
import React from 'react';

import RegisterPanel from '@/components/register';

const Register: NextPage = () => (
  <div className="h-screen w-screen flex justify-center items-center bg-white text-black dark:text-white dark:bg-black p-4">
    <RegisterPanel isModal={false} redirectPath="/" />
  </div>
);

export default Register;
