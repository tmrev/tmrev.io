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
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  imdb: IMDB
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

interface Genre {
  id: number;
  name: string;
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

interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

export type {
  Genre, Movie, MovieQuery,
  ProductionCompany, ProductionCountry, SpokenLanguage,
};
