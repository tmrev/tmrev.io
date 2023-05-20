import React, { useState } from 'react';
import { FieldError } from 'react-hook-form';
import { twMerge } from 'tailwind-merge'

import Button from './Button';

interface Props extends
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  error?: FieldError
  variant?: 'input' | 'textarea'
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, Props>(({
  type, error, variant, label, className, ...other
}, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  if (variant === 'textarea') {
    return (
      <div className="w-full relative text-white">
        {label && (
          <p className=" font-semibold pb-1 text-md">{label}</p>
        )}
        <textarea
          ref={ref as any}
          {...other as any}
          className={twMerge(
            'border-2 px-2 py-1 rounded w-full',
            'dark:bg-black opacity-100 dark:border-black dark:text-white',
            'dark:focus:outline-white focus:outline-black focus:outline-1',
            className
          )}
        />
        {error && (
          <p className="text-red-500 mt-1">{error.message}</p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full relative text-white">
      {label && (
        <p className=" font-semibold pb-1 text-md">{label}</p>
      )}
      <input
        ref={ref as any}
        {...other}
        className={twMerge(
          'border-2 px-2 py-1 rounded w-full',
          'dark:bg-black opacity-100 dark:border-black dark:text-white',
          'dark:focus:outline-white focus:outline-black focus:outline-1',
          className
        )}
        type={type === 'password' && isPasswordVisible ? 'text' : type}
      />
      {error && (
        <p className="text-red-500 mt-1">{error.message}</p>
      )}
      {type === 'password' && (
        <Button className="absolute right-1 top-0" hoverEffect={false} variant="icon" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
          <span className="material-icons ">
            {isPasswordVisible ? 'visibility' : 'visibility_off'}
          </span>
        </Button>
      )}
    </div>
  );
});

Input.defaultProps = {
  error: undefined,
  label: undefined,
  variant: 'input',
};

export default Input;
