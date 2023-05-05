import React, { FunctionComponent } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {

}

const OutlineButton: FunctionComponent<Props> = ({children, className, ...props}: Props) => (
  <button 
    {...props}
    className={
      twMerge('w-full border border-tmrev-alt-yellow text-tmrev-alt-yellow p-2 rounded uppercase', className)
    }
    // eslint-disable-next-line react/button-has-type
    type={props.type ? props.type : 'button'}
  >
    {children}
  </button>
)

export default OutlineButton