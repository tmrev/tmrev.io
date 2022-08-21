import clsx from 'clsx';
import React from 'react';

interface VariantMap {
  body: 'p',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6'
}

type VariantMapType = 'body' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface Props extends React.HTMLAttributes<HTMLElement> {
  variant: VariantMapType
  children: any;
}

const variantsMapping: VariantMap = {
  body: 'p',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
};

// eslint-disable-next-line max-len
const Typography: React.FunctionComponent<Props> = React.forwardRef<HTMLParagraphElement | HTMLHeadingElement, Props>((props, ref) => {
  const { variant, className, ...other }: Props = props;
  const Component = React.createElement(variantsMapping[variant || 'body'], {
    className: clsx(`typography--variant-${variant}`, className),
    ref,
    ...other,
  });

  return Component;
});

export default Typography;
