import { NextPage } from "next";
import React from "react";

import LoginPanel from "@/components/login";

const Login: NextPage = () => (
  <div className="h-screen w-screen flex justify-center items-center bg-white text-black dark:text-white dark:bg-black p-4">
    <LoginPanel isModal={false} redirectPath="/" />
  </div>
);

export default Login;
