import Image from 'next/image';
import Link from 'next/link';
import React, { FunctionComponent } from 'react';

import { Genre, IMDB } from '../../models/tmdb';
import { formatRuntime, numberShortHand } from '../../utils/common';
import { createMediaUrl } from '../../utils/mediaID';

interface MetaDataProps {
  imdb?: IMDB
  tmdb: {
    vote_average: number;
    vote_count: number;
    id: number
    title: string;
  }
  genres: Genre[]
  runtime: number
  ageRating?: string
}

interface MetaItemProps {
  children: React.ReactNode
  title: string
}

const MetaItem:FunctionComponent<MetaItemProps> = ({ children, title }:MetaItemProps) => (
  <div className="flex items-center w-full mt-4">

    <h2 className="text-xl font-semibold">{title}</h2>
    <span className="flex-grow" />
    {children}
  </div>
);

const MetaData:FunctionComponent<MetaDataProps> = ({
  imdb, genres, runtime, ageRating,
  tmdb,
}: MetaDataProps) => (
  <div className="max-w-full lg:max-w-[350px]">
    {imdb && (
      <MetaItem title="Rating">
        <div className="flex-col">
          <Link passHref href={`https://www.imdb.com/title/${imdb?.uid}/`}>
            <a className="flex items-center space-x-2">
              <Image
                height={32}
                objectFit="contain"
                src="/images/icons/imdb/imdb-icon.svg"
                width={32}
              />
              <p className="opacity-75">
                {imdb?.averageRating}
              </p>
              <p className="opacity-75">
                (
                {numberShortHand(Number(imdb?.numVotes)) }
                )
              </p>
            </a>
          </Link>
          <Link passHref href={`https://www.themoviedb.org/movie/${createMediaUrl(tmdb.id, tmdb.title)}`}>
            <a className="flex items-center space-x-2">
              <Image
                height={32}
                objectFit="contain"
                src="/images/icons/tmdb/tmdb-icon.svg"
                width={32}
              />
              <p className="opacity-75">
                {tmdb.vote_average}
              </p>
              <p className="opacity-75">
                (
                {numberShortHand(Number(tmdb.vote_count)) }
                )
              </p>
            </a>
          </Link>
        </div>

      </MetaItem>
    )}
    {!!genres.length && (
      <MetaItem title="Genres">
        <p className="flex flex-wrap items-center max-w-[150px] space-x-2">
          {genres.map((value) => (
            <Link key={value.id} passHref href="#">
              <a className="hover:underline">
                <span>{value.name}</span>
              </a>
            </Link>
          ))}
        </p>
      </MetaItem>
    )}
    {runtime && (
      <MetaItem title="Runtime">
        <p className="flex flex-wrap items-center max-w-[150px] space-x-2">
          {formatRuntime(runtime)}
        </p>
      </MetaItem>
    )}
    {ageRating && (
      <MetaItem title="Age Rating">
        <p className="flex flex-wrap items-center max-w-[150px] space-x-2">
          {ageRating}
        </p>
      </MetaItem>
    )}
  </div>
);

MetaData.defaultProps = {
  ageRating: '',
  imdb: undefined,
};

export default MetaData;
