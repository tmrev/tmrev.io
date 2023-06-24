import React, { useMemo } from 'react'

import HorizontalScroll from '@/components/common/scroll/horizontalScroll';
import HeaderText from '@/components/common/typography/headerText';
import HorizontalSkeleton from '@/components/skeleton/horizontalSkeleton';
import { MovieGeneral } from '@/models/tmdb/movie/tmdbMovie';
import { useBatchMoviesQuery, useGetTopReviewedQuery } from '@/redux/api';


const MostReviewedMovies: React.FC = () => {
  const { data, isFetching } = useGetTopReviewedQuery();

  const batchedIds = useMemo(() => {
    if (!data|| !data.body) return []

    const top = data.body.map((v) => v._id);

    return top
  }, [data]);

  const { data: movieData, isFetching: isLoadingBatch } = useBatchMoviesQuery(batchedIds, {skip: !batchedIds.length})

  const formatMovies = useMemo(() => {
    if(!movieData) return []


    const movies: MovieGeneral[] = []


    Object.keys(movieData.body).forEach((key) => {

      movies.push({
        ...movieData.body[key] as any
      })

    })

    return movies

  }, [movieData])

  return (
    <section className="space-y-8" >
      <div>
        <HeaderText>Most reviewed</HeaderText>
      </div>
      {isFetching || isLoadingBatch ? (
        <HorizontalSkeleton className='aspect-moviePoster' skeletonHeight={173} skeletonWidth={115}/>
      ) : (
        <HorizontalScroll movies={formatMovies}/>
      )}
    </section>
  )
}

export default MostReviewedMovies