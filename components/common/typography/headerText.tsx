import React from 'react';
import { twMerge } from 'tailwind-merge';

type Headings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p'

interface Props extends React.HTMLAttributes<HTMLHeadingElement>{
  headingType?: Headings
}

const HeaderText: React.FunctionComponent<Props> = React.forwardRef<
HTMLHeadingElement | HTMLParagraphElement,
Props
>(({ headingType, className, ...other }, ref) => {
  const Component = React.createElement(headingType || 'h1', {
    className: twMerge('text-tmrev-alt-yellow font-bold tracking-widest text-xl md:text-2xl uppercase', className),
    ref,
    ...other,
  });

  return Component;
});

HeaderText.defaultProps = {
  headingType: 'h1',
};

export default HeaderText;
