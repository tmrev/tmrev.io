import React, { FunctionComponent } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {

}

const FilledButton: FunctionComponent<Props> = ({children, className, ...props}: Props) => (
  <button 
    {...props}
    className={
      twMerge('w-full bg-tmrev-alt-yellow text-black font-semibold p-2 rounded uppercase', className)
    }
    // eslint-disable-next-line react/button-has-type
    type={props.type ? props.type : 'button'}
  >
    {children}
  </button>
)

export default FilledButton