import { TmrevReview } from '../tmrev';

/* eslint-disable no-unused-vars */
interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  imdb?: IMDB
  credits: Credits;
  release_dates: ReleaseDates;
  reviews: Reviews;
  tmrevReviews: TmrevReview[]
}

interface IMDB {
  '_id': string,
  'uid': string,
  'titleType': string,
  'primaryTitle': string,
  'originalTitle': string,
  'isAdult': string,
  'startYear': string,
  'endYear': string,
  'runtimeMinutes': string,
  'genres': string,
  'averageRating': string,
  'numVotes': string
}

interface MovieQuery {
  movie_id: number;
  language?: string
  append_to_response?: string
}

type GetMovieReviewSortBy =
'averagedAdvancedScore.asc'|
'averagedAdvancedScore.desc'|
'acting.asc.advancedScore'|
'acting.desc.advancedScore'|
'characters.asc.advancedScore'|
'characters.desc.advancedScore'|
'cinematography.asc.advancedScore'|
'cinematography.desc.advancedScore'|
'climax.asc.advancedScore'|
'climax.desc.advancedScore'|
'ending.asc.advancedScore'|
'ending.desc.advancedScore'|
'music.asc.advancedScore'|
'music.desc.advancedScore'|
'personalScore.asc.advancedScore'|
'personalScore.desc.advancedScore'|
'plot.asc.advancedScore'|
'plot.desc.advancedScore'|
'theme.asc.advancedScore'|
'theme.desc.advancedScore'|
'visuals.asc.advancedScore'|
'visuals.desc.advancedScore'|
'reviewedDate.asc'|
'reviewedDate.desc'

interface MovieReviewQuery {
  count?: number;
  include_user_review?: string;
  skip?: number;
  sort_by?: GetMovieReviewSortBy;
}

interface MovieReviewPayload {
  movie_id: number
  query?: MovieReviewQuery
}

interface Genre {
  id: number;
  name: string;
}

interface Buy {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}
interface WatchProviderResponse {
  [x: string]: {
    buy?: Buy[];
    flatrate?: Buy[];
    link: string;
    rent?: Buy[];
  };
}

interface ProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface Credits {
  cast: Cast[];
  crew: Cast[];
}

interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: string;
  job?: string;
}

enum OriginalLanguage {
  CS = 'cs',
  Empty = '',
  En = 'en',
  Es = 'es',
  Fr = 'fr',
}

interface ReleaseDates {
  results: Result[];
}

export interface Result {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

interface ReleaseDate {
  certification: string;
  iso_639_1: OriginalLanguage;
  note: string;
  release_date: Date;
  type: number;
}

interface Reviews {
  page: number;
  results: ReviewsResult[];
  total_pages: number;
  total_results: number;
}

interface ReviewsResult {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: Date;
  id: string;
  updated_at: Date;
  url: string;
}

interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: string;
  rating: number;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: OriginalLanguage;
  name: string;
}

export type {
  AuthorDetails, Buy, Cast, Credits,
  Genre, GetMovieReviewSortBy, IMDB,
  Movie, MovieQuery, MovieReviewPayload,
  MovieReviewQuery,
  OriginalLanguage,
  ProductionCompany, ProductionCountry, ReleaseDate,
  ReleaseDates,
  Reviews, ReviewsResult,
  SpokenLanguage, WatchProviderResponse,
};
