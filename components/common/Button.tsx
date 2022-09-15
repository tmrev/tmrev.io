import clsx from 'clsx';
import React, { FunctionComponent, useMemo } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'icon' | 'text' | 'danger'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  hoverEffect?: boolean
}

const Button:FunctionComponent<Props> = ({
  children, variant, className, type, hoverEffect, ...other
}: Props) => {
  const staticType = useMemo(() => type || 'button', [type]);

  const renderClassName = () => {
    switch (variant) {
      case 'primary':
        return clsx(
          'p-2 rounded bg-blue-500  text-white disabled:opacity-25 ',
          hoverEffect && 'hover:bg-blue-600',
        );
      case 'secondary':
        return clsx(
          'p-2 rounded bg-gray-500 text-white',
          hoverEffect && 'hover:bg-gray-600 ',
        );
      case 'danger':
        return clsx(
          'p-2 rounded bg-red-600 text-white',
          hoverEffect && 'hover:bg-red-700',
        );
      case 'icon':
        return clsx(
          'p-2 rounded flex item-center justify-center',
          hoverEffect && 'hover:bg-gray-100 dark:hover:bg-tmrev-gray-dark',
        );
      default:
        return clsx('p-2 rounded text-left hover:underline');
    }
  };

  return (
    // eslint-disable-next-line react/button-has-type
    <button {...other} className={`${renderClassName()} ${className} dark:text-white  disabled:cursor-not-allowed`} type={staticType}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  hoverEffect: true,
  variant: 'text',
};

export default Button;
