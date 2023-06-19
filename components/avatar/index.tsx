import Image from 'next/image'
import React, { DetailedHTMLProps, FC, ImgHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

import { TmrevUser } from '@/models/tmrev/user'
import { renderImageSrc } from '@/utils/common'

interface Props extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  user: TmrevUser
  size?: number
}

const Avatar:FC<Props> = ({user, size = 48, className, ...other}: Props) => {

  const userProfileImageUrl: string = renderImageSrc(user)

  return (
    <Image
      {...other as any}
      alt='User Avater'
      className={twMerge('bg-white rounded-full object-contain', className)}
      height={size}
      objectFit='contain'
      src={userProfileImageUrl}
      width={size}
    />
  )

}

Avatar.defaultProps = {
  size: 48
}

export default Avatar