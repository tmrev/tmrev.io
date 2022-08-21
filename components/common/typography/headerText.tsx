import clsx from 'clsx';
import React from 'react';

type Headings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p'

interface Props extends React.HTMLAttributes<HTMLHeadingElement>{
  headingType?: Headings
}

const HeaderText: React.FunctionComponent<Props> = React.forwardRef<
HTMLHeadingElement | HTMLParagraphElement,
Props
>(({ headingType, ...other }, ref) => {
  const Component = React.createElement(headingType || 'h1', {
    className: clsx('text-tmrev-alt-yellow font-bold tracking-widest text-xl md:text-2xl uppercase'),
    ref,
    ...other,
  });

  return Component;
});

HeaderText.defaultProps = {
  headingType: 'h1',
};

export default HeaderText;
