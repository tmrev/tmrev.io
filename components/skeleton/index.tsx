import React, { FC } from 'react'
import ReactSkeleton, { SkeletonProps } from 'react-loading-skeleton'

interface Props extends SkeletonProps {}

const Skeleton: FC<Props> = ({...props}: Props) => (
  <ReactSkeleton 
    {...props} 
    baseColor='#3B3B3B' 
    borderRadius={4} 
    highlightColor='#555555'  
  />
)

export default Skeleton