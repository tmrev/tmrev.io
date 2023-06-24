import React from "react";

import HorizontalScroll from "@/components/common/scroll/horizontalScroll";
import HeaderText from "@/components/common/typography/headerText";
import HorizontalSkeleton from "@/components/skeleton/horizontalSkeleton";
import { SortBy } from "@/models/tmdb/movie/movieDiscover";
import { useGetMovieDiscoverQuery } from "@/redux/api/tmdb/movieAPI";
import getThursdayAndNextSunday from "@/utils/date/weekendReleaseDays";


const WeekendReleases: React.FC = () => {
  const dates = getThursdayAndNextSunday()

  const {data, isFetching} = useGetMovieDiscoverQuery({params: {
    include_adult: false,
    language: 'en-US',
    page: 1,
    region: 'US',
    "release_date.gte": dates.thursday,
    "release_date.lte": dates.sunday,
    sort_by: SortBy.MOST_POPULAR,
    with_release_type: '3|2'
  }})

  return (
    <section className="space-y-8">
      <div>
        <HeaderText>Weekend Releases</HeaderText>
      </div>
      {!data || isFetching ? (
        <HorizontalSkeleton className='aspect-moviePoster' skeletonHeight={173} skeletonWidth={115}/>
      ) : (
        <HorizontalScroll movies={data.results}/>
      )}
    </section>
  )
}

export default WeekendReleases

