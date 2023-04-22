import type { DiscoverMovie, DiscoverMovieQuery, DiscoverMovieResult } from './discoverMovie';
import type { DiscoverTv, DiscoverTvQuery } from './discoverTv';
import type {
  Buy, Cast, Credits,
  Genre, IMDB,
  Movie, MovieQuery,
  ProductionCompany, ProductionCountry, ReleaseDate, ReleaseDates,
  SpokenLanguage, WatchProviderResponse,
} from './movie';
import type {
  SearchMovie,
  SearchMovieQuery,
  SearchMovieResponse,
} from './searchMovie';

// eslint-disable-next-line no-unused-vars
enum MediaType {
  // eslint-disable-next-line no-unused-vars
  MOVIE = 'movie',
  // eslint-disable-next-line no-unused-vars
  TV = 'tv'
}

type KnownForGeneric = {
  poster_path?: string
  id: number
  overview: string
  backdrop_path?: string
  vote_average: number
  vote_count: number
  popularity: number
  genre_ids: number[]
  original_language: string
}

type KnownForMovie = KnownForGeneric & {
  media_type: MediaType.MOVIE,
  adult: boolean
  release_date: string
  original_title: string
  title: string
  video: boolean
}

type KnownForTV = KnownForGeneric & {
  media_type: MediaType.TV
  first_air_date: string
  origin_county: number[]
  name: string
  original_name: string
}

export type {
  Buy,
  Cast,
  Credits,
  DiscoverMovie,
  DiscoverMovieQuery,
  DiscoverMovieResult,
  DiscoverTv,
  DiscoverTvQuery,
  Genre,
  IMDB,
  KnownForGeneric,
  KnownForMovie,
  KnownForTV,
  MediaType,
  Movie,
  MovieQuery,
  ProductionCompany,
  ProductionCountry,
  ReleaseDate,
  ReleaseDates,
  SearchMovie,
  SearchMovieQuery,
  SearchMovieResponse,
  SpokenLanguage,
  WatchProviderResponse
};
