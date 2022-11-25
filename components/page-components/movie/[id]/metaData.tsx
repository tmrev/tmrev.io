import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { FunctionComponent, useMemo } from 'react';

import { Buy, Genre, IMDB } from '../../../../models/tmdb';
import { Body } from '../../../../models/tmrev/movie';
import { formatRuntime, numberShortHand } from '../../../../utils/common';
import getCounty from '../../../../utils/getCounty';
import imageUrl from '../../../../utils/imageUrl';
import { createMediaUrl } from '../../../../utils/mediaID';

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
  movie: Body
}

interface MetaItemProps {
  children: React.ReactNode
  title: string
  vertical?: boolean
  hideMobile?: boolean
}

interface ProviderItemProps {
  data: Buy
  link: string
}

const MetaItem:FunctionComponent<MetaItemProps> = ({
  children, title, vertical, hideMobile,
}:MetaItemProps) => (
  <div className={clsx('flex  w-full mt-4', vertical ? 'flex-col justify-start space-y-3' : 'flex-row items-center', hideMobile && 'hidden lg:flex')}>
    <h2 className="text-xl font-semibold">{title}</h2>
    <span className="flex-grow" />
    {children}
  </div>
);

const ProviderItem: FunctionComponent<ProviderItemProps> = ({ data, link }) => (
  <div>
    <Link key={data.provider_id} passHref href={link}>
      <a rel="noopener" target="_blank">
        <div key={data.provider_id} className="flex items-center space-x-3">
          <div className="relative w-8 h-8  lg:h-4 lg:w-4 ">
            <Image
              alt={data.provider_name}
              className="rounded"
              layout="fill"
              objectFit="cover"
              src={imageUrl(data.logo_path)}
            />
          </div>
          <p className="hidden lg:block">
            {data.provider_name}
          </p>
        </div>
      </a>
    </Link>
  </div>
);

MetaItem.defaultProps = {
  hideMobile: false,
  vertical: false,
};

const MetaData:FunctionComponent<MetaDataProps> = ({
  imdb, genres, runtime, ageRating,
  tmdb, movie,
}: MetaDataProps) => {
  const watchProvider = useMemo(() => {
    const county = getCounty();

    if (county && movie.watchProvider) {
      return movie.watchProvider[county];
    }

    return null;
  }, []);

  return (
    <div className="max-w-full lg:max-w-[350px]">
      {imdb && (
        <MetaItem title="Rating">
          <div className="flex-col">
            <Link passHref href={`https://www.imdb.com/title/${imdb?.uid}/`}>
              <a className="flex items-center space-x-2">
                <Image
                  alt="imdb"
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
                  alt="tmdb"
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
      {movie.budget && (
        <MetaItem title="Budget">
          <p className="flex flex-wrap items-center max-w-[150px] space-x-2">
            {numberShortHand(movie.budget)}
          </p>
        </MetaItem>
      )}
      {!!genres.length && (
        <MetaItem title="Genres">
          <p className="flex flex-wrap items-center max-w-[150px] space-x-2">
            {genres.map((value) => (
              <Link key={value.id} passHref href="#">
                <a className="hover:underline mx-2">
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
      {
        movie.watchProvider && watchProvider && (
          <MetaItem vertical title="Where to Watch">
            {
              watchProvider.flatrate && (
                <div className="space-y-2">
                  <p className="text-lg font-semibold">Streaming</p>
                  <div className="flex flex-row space-x-3 lg:flex-col lg:space-x-0">
                    {watchProvider.flatrate.map((provider) => (
                      <ProviderItem
                        key={provider.provider_id}
                        data={provider}
                        link={watchProvider.link}
                      />
                    ))}
                  </div>
                </div>
              )
            }
            {watchProvider.buy?.length && (
              <div className="space-y-2">
                <p className="text-lg font-semibold">Buy</p>
                <div className="flex flex-row space-x-3 lg:flex-col lg:space-x-0">
                  {[...watchProvider.buy].splice(0, 3).map((provider) => (
                    <ProviderItem
                      key={provider.provider_id}
                      data={provider}
                      link={watchProvider.link}
                    />
                  ))}
                </div>
              </div>
            )}
            {
              watchProvider.rent && (
                <div className="space-y-2">
                  <p className="text-lg space-y-1 font-semibold">Rent</p>
                  <div className="flex flex-row space-x-3 lg:flex-col lg:space-x-0">
                    {[...watchProvider.rent].splice(0, 3).map((provider) => (
                      <ProviderItem
                        key={provider.provider_id}
                        data={provider}
                        link={watchProvider.link}
                      />
                    ))}
                  </div>
                </div>
              )
            }
          </MetaItem>
        )
      }
    </div>
  );
};

MetaData.defaultProps = {
  ageRating: '',
  imdb: undefined,
};

export default MetaData;
