/* eslint-disable no-unused-vars */
interface SearchMovieResponse {
  page: number;
  results: SearchMovie[];
  total_results: number;
  total_pages: number;
}

interface SearchMovieQuery {
  language: 'en-US',
  query: string,
  page?: number,
  include_adult?: boolean,
  region?: string,
  year?: number,
  primay_release_year?: number
}

interface SearchMovie {
  poster_path: null | string;
  adult: boolean;
  overview: string;
  release_date: Date;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: OriginalLanguage;
  title: string;
  backdrop_path: null | string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

enum OriginalLanguage {
  En = 'en',
  It = 'it',
  Zh = 'zh',
}

export type {
  OriginalLanguage, SearchMovie, SearchMovieQuery, SearchMovieResponse,
};
