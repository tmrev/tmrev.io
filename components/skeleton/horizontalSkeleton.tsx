import React from "react";

import Skeleton from ".";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  skeletonHeight?: number
  skeletonWidth?: number
  skeletonClass?: string
}

function createArray(length: number) {
  const arr = Array.from({length}, (_, i) => i);
  return arr;
}

const HorizontalSkeleton: React.FC<Props> = ({
  skeletonHeight,
  skeletonWidth,
  skeletonClass
}: Props) => (
  <div className="grid grid-rows-1 grid-flow-col gap-3 overflow-x-auto pb-3">
    {createArray(10).map((value) => (
      <Skeleton key={value} className={skeletonClass} height={skeletonHeight} width={skeletonWidth} />
    ))}
  </div>
)

HorizontalSkeleton.defaultProps = {
  skeletonClass: undefined,
  skeletonHeight: undefined,
  skeletonWidth: undefined
}

export default HorizontalSkeleton