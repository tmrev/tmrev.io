import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Button from '@/components/common/Button';
import MetaTags from '@/components/common/MetaTag';
import Spinner from '@/components/common/spinner';
import MoviePoster, { LocationPath } from '@/components/poster';
import { Topic } from '@/constants/search';
import { useAppDispatch, useAppSelector } from '@/hooks';
import useScroll from '@/hooks/useScroll';
import { SortBy } from '@/models/tmdb/discover';
import {
  findMovies,   
  findMovieYear,
  findPeople,   
  getRunningQueriesThunk,
  useFindMoviesQuery,  
  useFindMovieYearQuery,  
  useFindPeopleQuery,  
} from '@/redux/api/tmdb/searchAPI';
import { addData, incrementPage } from '@/redux/slice/searchResultSlice';
import { wrapper } from '@/redux/store';
import { capitalize } from '@/utils/common';

interface Props {
  q?: string;
  topic?: Topic
}

const Search: NextPage<Props> = ({ q, topic }: Props) => {
  const { data, page } = useAppSelector((state) => state.searchResult);
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [isScrolling, setIsScrolling] = useState<boolean>(false)

  // const [yearList, setYearList] = useState<MovieGeneral[]>([])

  const { isBottom, scrollPosition, handleScrollTo } = useScroll()

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

  const handleRouteChange = useCallback(() => {
    if(!scrollPosition) return

    // When user navigates away, save the current scroll position
    localStorage.setItem('scrollPosX', scrollPosition.x.toString());
    localStorage.setItem('scrollPosY', scrollPosition.y.toString());
  }, [scrollPosition])

  useEffect(() => {
    setIsScrolling(true)
  }, [scrollPosition])

  useEffect(() => {
    const scrollPosX = localStorage.getItem('scrollPosX');
    const scrollPosY = localStorage.getItem('scrollPosY');

    // Check if scroll position data exists in localStorage
    if (scrollPosX !== null && scrollPosY !== null && !isScrolling) {
      handleScrollTo(Number(scrollPosX), Number(scrollPosY));
    }

    // Listen for route changes
    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [handleRouteChange])

  const handleLoadMore = () => {
    dispatch(incrementPage())
  }

  useEffect(() => {
    if(!yearData || topic !== Topic.YEAR) return

    const newArr = [...yearData.results]

    dispatch(addData(newArr));

  }, [yearData])

  useEffect(() => {
    if(topic !== Topic.YEAR) return

    if(isBottom){
      if(page !== yearData?.total_pages) {
        dispatch(incrementPage())
      }
    }
  }, [isBottom])

  const renderMovieData = () => {
    if(payload.topic !== Topic.MOVIE || !movieData) return null

    return (
      <>
        {
          movieData.results.map(({id, title, poster_path}) => (
            <MoviePoster 
              key={id}
              imgUrl={poster_path}
              location={LocationPath.MOVIE}
              movieId={id}
              name={title}
            />
          ))
        }
      </>
    )
  }

  const renderYearData = () => {
    if(payload.topic !== Topic.YEAR || !data.length) return null

    return (
      <>
        {
          data.map(({id, title, poster_path}) => (
            <MoviePoster 
              key={id}
              imgUrl={poster_path}
              location={LocationPath.MOVIE}
              movieId={id}
              name={title}
            />
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
          peopleData.results.map(({name, id, profile_path}) => (
            <MoviePoster 
              key={id}
              imgUrl={profile_path}
              location={LocationPath.PEOPLE}
              movieId={id}
              name={name}
            />
          ))
        }
      </>
    )
  }

  return (
    <div className="flex-col p-1 md:p-3 text-center">
      <MetaTags
        description="Looking for the best movies? Reviews from real users can help you find the right one. Lists from experts can help you find what you're looking for."
        title="Find the latest movies and user lists on the world's largest movie review site."
        url={`https://tmrev.io/search?q=${q}&topic=${topic}`}
      />
      <h1 className='flex text-white text-3xl space-x-3 w-full'>
        {topic && (
          <span className='opacity-75' >{capitalize(topic)}:</span>
        )}
        {q && (
          <span>{capitalize(q)}</span>
        )}
      </h1>
      <div className="flex flex-wrap gap-1 justify-center">
        {renderMovieData()}
        {renderPeopleData()}
        {renderYearData()}
      </div>
      <div className="flex justify-center mt-4">
        <Button variant="primary" onClick={handleLoadMore}>
          Load More Data
        </Button>
      </div>
    </div>
  );
};

export default Search;

Search.defaultProps = {
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

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        q: q || '',
        topic
      },
    };
  },
);
