import React, { FunctionComponent } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}

const Chip: FunctionComponent<Props> = ({children, className, ...props}: Props) => (
  <div 
    {...props}
    className={
      twMerge('bg-tmrev-gray-dark px-3 py-2 rounded-full', className)
    }>
    {children}
  </div>
)

export default Chip