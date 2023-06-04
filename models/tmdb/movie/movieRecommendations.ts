import { IMovieQueryGeneral, MovieGeneral } from "./tmdbMovie";

interface IMovieRecommendationsQuery extends IMovieQueryGeneral {
  params: {
    language?: string,
    page: number
  }
}

interface IMovieRecommendationResponse {
  page: number
  results: MovieGeneral[]
}

export type { IMovieRecommendationResponse, IMovieRecommendationsQuery }