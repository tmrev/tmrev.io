import { IMovieQueryGeneral, MovieGeneral } from "./tmdbMovie";

interface IMovieSimilarQuery extends IMovieQueryGeneral {
  params: {
    language?: string
    page: number
  }
}

interface IMovieSimilarResponse {
  page: number
  results: MovieGeneral[]
}

export type { IMovieSimilarQuery, IMovieSimilarResponse }