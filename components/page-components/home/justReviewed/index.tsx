import React, { useMemo } from 'react'

import HorizontalScroll from '@/components/common/scroll/horizontalScroll';
import HeaderText from '@/components/common/typography/headerText';
import HorizontalSkeleton from '@/components/skeleton/horizontalSkeleton';
import { MovieGeneral } from '@/models/tmdb/movie/tmdbMovie';
import { useBatchMoviesQuery, useGetJustReviewedQuery } from '@/redux/api';
import { numberShortHand } from '@/utils/common';

const JustReviewedMovies: React.FC = () => {

  const { data, isFetching } = useGetJustReviewedQuery();

  const batchedIds = useMemo(() => {
    if (!data|| !data.body) return []

    const just = data?.body.movies.map((v) => v.tmdbID);

    return just
  }, [data]);

  const { data: movieData, isFetching: isLoadingBatch } = useBatchMoviesQuery(batchedIds, {skip: !batchedIds.length})

  const formatMovies = useMemo(() => {
    if(!movieData || !data) return []


    const movies: MovieGeneral[] = []


    Object.keys(movieData.body).forEach((key) => {

      movies.push({
        ...movieData.body[key] as any
      })

    })

    return movies.sort((a, b) => batchedIds.indexOf(a.id) - batchedIds.indexOf(b.id))

  }, [movieData, data])


  return (
    <section className="space-y-8" >
      <div className="flex items-center space-x-3">
        <HeaderText headingType="h2">Just reviewed</HeaderText>
        <p className="text-white font-light">
          {`${numberShortHand(
            data ? data.body.count : 0,
          )} Movies Reviewed`}
        </p>
      </div>
      {isFetching || isLoadingBatch ? (
        <HorizontalSkeleton className='aspect-moviePoster' skeletonHeight={173} skeletonWidth={115}/>
      ) : (
        <HorizontalScroll movies={formatMovies}/>
      )}
    </section>
  )

}


export default JustReviewedMovies