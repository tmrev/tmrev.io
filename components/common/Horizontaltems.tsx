import Image from 'next/image'
import Link from 'next/link'
import React, { Children, useRef, useState } from 'react'
import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";

import { NoImage } from '@/constants';
import { useBatchMoviesQuery } from '@/redux/api';

import imageUrl from '../../utils/imageUrl';
import { createMediaUrl } from '../../utils/mediaID';

function HorizontalScrollContainer(props: { children: React.ReactNode }) {
  const { children } = props;

  const contentRef = useRef<HTMLDivElement>(null)
  const [scrollLeftVal, setScrollLeftVal] = useState(0);
  const [scrollRightVal, setScrollRightVal] = useState(true);

  const scrollLeft = () => {
    if (contentRef.current) {
      const blockRef = contentRef.current
      const maxScroll = blockRef.scrollWidth - blockRef.clientWidth;

      blockRef.scrollLeft -= 300
      if (blockRef.scrollLeft - 2 < maxScroll) setScrollRightVal(true);
      if (blockRef.scrollLeft <= 300) setScrollLeftVal(0)
    }
  }

  const scrollRight = () => {

    if (contentRef.current) {
      const blockRef = contentRef.current
      const maxScroll = blockRef.scrollWidth - blockRef.clientWidth;

      blockRef.scrollLeft += 300
      if (scrollLeftVal < 300) setScrollLeftVal(300)
      if (blockRef.scrollLeft + 302 > maxScroll) setScrollRightVal(false)
    }
  }

  const hideRightArrow = !scrollRightVal ? null : <button className='hidden sm:inline-block absolute -right-6 z-5 text-4xl md:text-5xl text-slate-100' type="button" onClick={scrollRight}><BiChevronRightCircle className='transition-colors duration-150 rounded-full bg-black hover:text-sky-400' /> </button>;

  const hideLeftArrow = scrollLeftVal > 0 ? <button className="hidden sm:inline-block absolute -left-6 z-5 text-4xl md:text-5xl text-slate-100" type="button" onClick={scrollLeft}><BiChevronLeftCircle className='transition-colors duration-150 rounded-full bg-black hover:text-sky-400' /> </button> : null;

  return (
    <div className="relative flex items-center">
      {Children.count(children) > 6 ? hideLeftArrow : ""}
      <div ref={contentRef} className="flex justify-start space-x-4 md:space-x-3 md:justify-between items-center overflow-x-scroll scroll-smooth mt-8 scrollbar-hide">
        {children}
      </div>
      {Children.count(children) > 6 ? hideRightArrow : ""}
    </div>

  )
}

export default function HorizontalItems({ content, batchedIds }: any) {


  const { data: justReviewedImages } = useBatchMoviesQuery(batchedIds.just, {
    skip: !batchedIds.just.length,
  });

  if (content?.body?.movies) {
    return (
      <HorizontalScrollContainer>
        {content && justReviewedImages && [...content.body.movies].map((movie) => (
          <Link
            key={movie._id}
            passHref
            href={`/movie/${createMediaUrl(movie.tmdbID, movie.title)}`}
          >
            <div className="aspect-[2/3] h-[200px] w-[110px] md:h-[300px] md:w-[210px] relative rounded">
              <Image
                alt={movie.title}
                className='rounded-md cursor-pointer'
                layout="fill"
                objectFit="contain"
                src={imageUrl(justReviewedImages.body[movie.tmdbID]?.poster_path ?? NoImage, 300)}
              />
            </div>
          </Link>
        ))}
      </HorizontalScrollContainer>

    )
  }
  return (
    <HorizontalScrollContainer>
      {content && Object.keys(content.body).map((movie) => (
        <Link
          key={content.body[movie].id}
          passHref
          href={`/movie/${createMediaUrl(content.body[movie].id, content.body[movie].title)}`}
        >
          <div className="aspect-[2/3] h-[200px] w-[110px] md:h-[300px] md:w-[210px] relative rounded">
            <Image
              fill
              alt={content.body[movie].title}
              className='rounded-md cursor-pointer object-contain'
              src={imageUrl(content.body[movie]?.poster_path ?? NoImage, 300)}
            />
          </div>
        </Link>
      ))}
    </HorizontalScrollContainer>
  )

}

