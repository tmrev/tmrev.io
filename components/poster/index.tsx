/* eslint-disable no-unused-vars */
import clsx from 'clsx';
import Image from 'next/image'
import Link from "next/link";
import React, { FC, useState } from "react";
import { twMerge } from 'tailwind-merge';

import { NoImage } from "@/constants";
import imageUrl from "@/utils/imageUrl";
import { createMediaUrl } from "@/utils/mediaID";

import Skeleton from '../skeleton';

export enum LocationPath {
  MOVIE = '/movie',
  TV = '/tv',
  PEOPLE = '/people'
}

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  movieId: number
  name: string
  imgUrl?: string,
  location: LocationPath,
  imageSize?: number
}

const MoviePoster:FC<Props> = ({location, imgUrl, imageSize, name, movieId, className}: Props) => {
  const [loading, setLoading] = useState(true)

  const handleImageLoad = () => {
    setLoading(false)
  }

  return (
    <Link key={movieId} passHref href={`${location}/${createMediaUrl(movieId, name)}`}>
      <a className={twMerge("relative rounded aspect-moviePoster h-[173px]  md:h-[280px]",className )}>
        {loading && (
          <Skeleton className=' absolute z-50 bottom-1' height="101%" width="100%" />
        )}
        <Image
          fill
          priority
          alt={`${name}`}
          className={
            clsx(
              loading && 'hidden',
              'rounded',
              'object-cover'
            )
          }
          src={imgUrl ? imageUrl(imgUrl, imageSize ?? 300) : NoImage}
          onLoad={handleImageLoad}
        />
      </a>
    </Link>
  )
  
}

MoviePoster.defaultProps = {
  imageSize: 300,
  imgUrl: NoImage
}

export default MoviePoster