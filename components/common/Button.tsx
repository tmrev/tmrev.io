import clsx from 'clsx';
import React, { FunctionComponent, useMemo } from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon' | 'text'
}

const Button:FunctionComponent<Props> = ({
  children, variant, className, type, ...other
}: Props) => {
  const staticType = useMemo(() => type || 'button', [type]);

  const renderClassName = () => {
    switch (variant) {
      case 'primary':
        return clsx('p-2 rounded bg-blue-500 hover:bg-blue-600 text-white');
      case 'secondary':
        return clsx('p-2 rounded bg-gray-500 hover:bg-gray-600 text-white');
      case 'icon':
        return clsx('p-2 rounded hover:bg-gray-100 dark:hover:bg-tmrev-gray-dark flex item-center justify-center');
      default:
        return clsx('p-2 rounded text-left hover:underline');
    }
  };

  return (
    // eslint-disable-next-line react/button-has-type
    <button {...other} className={`${renderClassName()} ${className}`} type={staticType}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  variant: 'text',
};

export default Button;
