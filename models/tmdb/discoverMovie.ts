export interface DiscoverMovie {
  page: number;
  results: DiscoverMovieResult[];
  total_results: number;
  total_pages: number;
}

export interface DiscoverMovieQuery {
  page: number
}

export interface DiscoverMovieResult {
  poster_path: null;
  adult: boolean;
  overview: string;
  release_date: Date;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: OriginalLanguage;
  title: string;
  backdrop_path: null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export enum OriginalLanguage {
  // eslint-disable-next-line no-unused-vars
  En = 'en',
}
