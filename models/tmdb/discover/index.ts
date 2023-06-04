/* eslint-disable no-unused-vars */
import Iso6391Code from "../ISO639-1";
import ISO3166_1 from "../ISO3166-1";
import { MovieGeneral } from "../movie/tmdbMovie";

export enum SortBy {
  PopularityAsc = 'popularity.asc',
  PopularityDesc = 'popularity.desc',
  ReleaseDateAsc = 'release_date.asc',
  ReleaseDateDesc = 'release_date.desc',
  RevenueAsc = 'revenue.asc',
  RevenueDesc = 'revenue.desc',
  PrimaryReleaseDateAsc = 'primary_release_date.asc',
  PrimaryReleaseDateDesc = 'primary_release_date.desc',
  OriginalTitleAsc = 'original_title.asc',
  OriginalTitleDesc = 'original_title.desc',
  VoteAverageAsc = 'vote_average.asc',
  VoteAverageDesc = 'vote_average.desc',
  VoteCountAsc = 'vote_count.asc',
  VoteCountDesc = 'vote_count.desc',
}


export interface DiscoverMovieQuery {
  language?: Iso6391Code
  region?: ISO3166_1
  sort_by?: SortBy
  certification_country?: string
  certification?: string
  'certification.lte'?: string
  'certification.gte'?: string
  include_adult?: boolean
  include_video?: boolean
  page?: number
  primary_release_year: number
  'primary_release_date.gte'?: Date
  'primary_release_date.lte'?: Date
  year?: number
}

export interface IDiscoverMovieResponse {
  page: number
  results: MovieGeneral[]
  total_results: number
  total_pages: number
}

