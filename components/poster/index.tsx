/* eslint-disable no-unused-vars */
import Image from 'next/image'
import Link from "next/link";
import React, { FC } from "react";

import { NoImage } from "@/constants";
import imageUrl from "@/utils/imageUrl";
import { createMediaUrl } from "@/utils/mediaID";

export enum LocationPath {
  MOVIE = '/movie',
  TV = '/tv',
  PEOPLE = '/people'
}

interface Props {
  id: number
  name: string
  imgUrl?: string,
  location: LocationPath,
  imageSize?: number
}

const MoviePoster:FC<Props> = ({location, imgUrl, imageSize, name, id}: Props) => (
  <Link key={id} passHref href={`${location}/${createMediaUrl(id, name)}`}>
    <a className="relative rounded aspect-moviePoster h-[173px]  md:h-[280px]">
      <Image
        priority
        alt={`${name}`}
        className="rounded"
        layout="fill"
        objectFit="cover"
        src={imgUrl ? imageUrl(imgUrl, imageSize ?? 300) : NoImage}
      />
    </a>
  </Link>
)

MoviePoster.defaultProps = {
  imageSize: 300,
  imgUrl: NoImage
}

export default MoviePoster