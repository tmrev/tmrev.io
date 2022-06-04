export interface DiscoverTv {
  page: number;
  results: Result[];
  total_results: number;
  total_pages: number;
}

export interface DiscoverTvQuery {
  page: number
}

export interface Result {
  poster_path: string;
  popularity: number;
  id: number;
  backdrop_path: null;
  vote_average: number;
  overview: string;
  first_air_date: Date;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}
