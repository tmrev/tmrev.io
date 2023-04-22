import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { NoImage } from '@/constants';

import imageUrl from '../../utils/imageUrl';
import { createMediaUrl } from '../../utils/mediaID';

type itemHorizontalContainerProps = {
  createMediaiId: number
  createMediaTitle: string
  imgSrc: string | null
}

export default function HorizontalItems({ createMediaiId, createMediaTitle, imgSrc }: itemHorizontalContainerProps) {
  return (
    <Link
      passHref
      href={`/movie/${createMediaUrl(createMediaiId, createMediaTitle)}`}
    >
      <a>
        <div>
          <div className="aspect-[2/3] h-[200px] w-[150px] md:h-[300px] md:w-[250px] relative rounded">
            <Image
              alt={createMediaTitle}
              className='rounded-md cursor-pointer'
              layout="fill"
              objectFit="contain"
              src={imageUrl(imgSrc ?? NoImage, 300)}
            />
          </div>
        </div>
      </a>
    </Link>
  )
}