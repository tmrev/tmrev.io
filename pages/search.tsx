import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';

import MetaTags from '@/components/common/MetaTag';
import Spinner from '@/components/common/spinner';
import { Topic } from '@/components/navigation/navSearch';
import { NoImage } from '@/constants';
import useScroll from '@/hooks/useScroll';
import { SortBy } from '@/models/tmdb/discover';
import { MovieGeneral } from '@/models/tmdb/movie/tmdbMovie';
import {
  findMovies,   
  findMovieYear,
  findPeople,   
  getRunningOperationPromises,
  useFindMoviesQuery,  
  useFindMovieYearQuery,  
  useFindPeopleQuery,  
} from '@/redux/api/tmdb/searchAPI';
import { wrapper } from '@/redux/store';
import { capitalize, uniqueArray } from '@/utils/common';
import imageUrl from '@/utils/imageUrl';
import { createMediaUrl } from '@/utils/mediaID';

interface Props {
  q?: string;
  topic?: Topic
  page?: number
}

const Search: NextPage<Props> = ({ q, topic, page: propPage }: Props) => {
  const [page, setPage] = useState<number>(propPage || 1)

  const [yearList, setYearList] = useState<MovieGeneral[]>([])

  const { isBottom } = useScroll()

  const payload: any = useMemo(() => ({
    query: q,
    topic
  }), [q, topic])

  const {
    data: movieData, 
  } = useFindMoviesQuery(payload, {skip: payload.topic !== Topic.MOVIE })

  const {
    data: peopleData
  } = useFindPeopleQuery(payload, {skip: payload.topic !== Topic.PEOPLE})

  const {
    data: yearData,
    isFetching: yearLoading
  } = useFindMovieYearQuery({
    page,
    primary_release_year: Number(q),
    sort_by: SortBy.VoteCountDesc
  }, {skip: payload.topic !== Topic.YEAR})

  useEffect(() => {
    setYearList([])
    setPage(1)
  }, [q])


  useEffect(() => {
    if(!yearData || topic !== Topic.YEAR) return

    setYearList((prevState) => {
      const newArr = uniqueArray([...prevState, ...yearData.results], 'id') 

      return newArr
    })
  }, [yearData])

  useEffect(() => {
    if(topic !== Topic.YEAR) return

    if(isBottom){
      if(page !== yearData?.total_pages) {
        setPage(page + 1)
      }
    }
  }, [isBottom])

  const renderMovieData = () => {
    if(payload.topic !== Topic.MOVIE || !movieData) return null

    return (
      <>
        {
          movieData.results.map((movie) => (
            <Link key={movie.id} passHref href={`/movie/${createMediaUrl(movie.id, movie.title)}`}>
              <a className="relative m-4 rounded aspect-moviePoster h-[200px]  md:h-[280px]">
                <Image
                  priority
                  alt={`${movie.title} poster`}
                  className="rounded"
                  layout="fill"
                  objectFit="cover"
                  src={movie.poster_path ? imageUrl(movie.poster_path, 300) : NoImage}
                />
              </a>
            </Link>
          ))
        }
      </>
    )
  }

  const renderYearData = () => {
    if(payload.topic !== Topic.YEAR || !yearList.length) return null

    return (
      <>
        {
          yearList.map((movie) => (
            <Link key={movie.id} passHref href={`/movie/${createMediaUrl(movie.id, movie.title)}`}>
              <a className="relative m-4 rounded aspect-moviePoster h-[200px]  md:h-[280px]">
                <Image
                  priority
                  alt={`${movie.title} poster`}
                  className="rounded"
                  layout="fill"
                  objectFit="cover"
                  src={movie.poster_path ? imageUrl(movie.poster_path, 300) : NoImage}
                />
              </a>
            </Link>
          ))
        }
        <div className='flex w-full items-center justify-center text-white'>
          {yearLoading && <Spinner/>}
        </div>
        
      </>
    )
  }

  const renderPeopleData = () => {
    if(payload.topic !== Topic.PEOPLE || !peopleData) return null

    return (
      <>
        {
          peopleData.results.map((people) => (
            <Link key={people.id} passHref href={`/people/${createMediaUrl(people.id, people.name)}`}>
              <a className="relative m-4 rounded aspect-moviePoster h-[200px]  md:h-[280px]">
                <Image
                  priority
                  alt={`${people.name}`}
                  className="rounded"
                  layout="fill"
                  objectFit="cover"
                  src={people.profile_path ? imageUrl(people.profile_path, 300) : NoImage}
                />
              </a>
            </Link>
          ))
        }
      </>
    )
  }

  return (
    <div className="flex-col p-3">
      <MetaTags
        description="Looking for the best movies? Reviews from real users can help you find the right one. Lists from experts can help you find what you're looking for."
        title="Find the latest movies and user lists on the world's largest movie review site."
        url={`https://tmrev.io/search?q=${q}&topic=${topic}`}
      />
      <h1 className='flex text-white text-3xl space-x-3'>
        {topic && (
          <span className='opacity-75' >{capitalize(topic)}:</span>
        )}
        {q && (
          <span>{capitalize(q)}</span>
        )}
      </h1>
      <div className="flex flex-wrap justify-start space-x-4 items-center overflow-hidden">
        {renderMovieData()}
        {renderPeopleData()}
        {renderYearData()}
      </div>
    </div>
  );
};

export default Search;

Search.defaultProps = {
  page: 1,
  q: '',
  topic: undefined
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const page = Number(context.query?.page) || 1
    const q = context.query?.q as string;
    const topic = context.query?.topic as Topic | undefined || Topic.MOVIE

    if (topic === Topic.MOVIE) {
      store.dispatch(findMovies.initiate({
        query: q,
      }))
    } else if (topic === Topic.PEOPLE) {
      store.dispatch(findPeople.initiate({
        query: q
      }))
    } else if (topic === Topic.YEAR) {
      store.dispatch(findMovieYear.initiate({
        page,
        primary_release_year: Number(q),
        sort_by: SortBy.VoteCountDesc
      }))
    }

    // if (typeof q === 'string' && topic) {
    //   store.dispatch(search.initiate({q, topic}));
    // } else if (typeof q === 'string') {
    //   store.dispatch(search.initiate({q}));
    // }

    await Promise.all(getRunningOperationPromises());

    return {
      props: {
        page,
        q: q || '',
        topic
      },
    };
  },
);
