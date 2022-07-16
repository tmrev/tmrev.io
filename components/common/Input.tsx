import clsx from 'clsx';
import React, { useState } from 'react';
import { FieldError } from 'react-hook-form';

import Button from './Button';

interface Props extends
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  error?: FieldError
}

const Input = React.forwardRef<HTMLInputElement, Props>(({ type, error, ...other }, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <div className="w-full relative">
      <input
        ref={ref}
        {...other}
        className={clsx(
          'border-2 px-2 py-1 rounded w-full',
          'dark:bg-black opacity-100 dark:border-black dark:text-white',
          'dark:focus:outline-white focus:outline-black focus:outline-1',
        )}
        type={type === 'password' && isPasswordVisible ? 'text' : type}
      />
      {error && (
        <p className="text-red-500 mt-1">{error.message}</p>
      )}
      {type === 'password' && (
        <Button className="absolute right-1 top-0" hoverEffect={false} variant="icon" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
          <span className="material-symbols-outlined ">
            {isPasswordVisible ? 'visibility' : 'visibility_off'}
          </span>
        </Button>
      )}
    </div>
  );
});

Input.defaultProps = {
  error: undefined,
};

export default Input;
