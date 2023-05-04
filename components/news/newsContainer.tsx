import React, { FunctionComponent } from 'react'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}

const NewsContainer: FunctionComponent<Props> = ({children}: Props) => (
  <div className="flex flex-wrap w-full justify-center ">
    {children}
  </div>
)


export default NewsContainer
