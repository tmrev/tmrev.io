/* eslint-disable no-unused-vars */
import { MovieGeneral } from "./tmdbMovie";

export enum SortBy {
  MOST_POPULAR = 'popularity.desc',
  LEAST_POPULAR = 'popularity.asc',
  MOST_REVENUE = 'revenue.desc',
  LEAST_REVENUE = 'revenue.asc',
  NEWEST_RELEASE_DATE = 'primary_release_date.desc',
  OLDEST_RELEASE_DATE = 'primary_release_date.asc',
  MOST_VOTES = 'vote_average.desc',
  LEAST_VOTES = 'vote_average.asc',
  MOST_VOTE_COUNT = 'vote_count.desc',
  LEAST_VOTE_COUNT = 'vote_count.asc'
}

interface IMovieDiscoverQuery {
  params: {
    language?: string,
    page: number
    certification?: string
    "certification.gte"?: string
    "certification.lte"?: string
    "certification_country"?: string
    include_adult?: boolean
    include_video?: boolean
    primary_release_year?: number
    "primary_release_date.gte"?: string
    "primary_release_date.lte"?: string
    region?: string
    "release_date.gte"?: string
    "release_date.lte"?: string
    sort_by?: SortBy
    with_release_type?: string
  }
}

interface IMovieDiscoverResponse {
  page: number
  results: MovieGeneral[]
}

export type { IMovieDiscoverQuery, IMovieDiscoverResponse }