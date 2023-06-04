import { IMovieQueryGeneral } from "./tmdbMovie";

interface IMovieKeywordsQuery extends IMovieQueryGeneral {

}

type MovieKeywords = {
  id: number
  name: string
}

interface IMovieKeywordsResponse {
  id: number
  keywords: MovieKeywords[]
}

export type { IMovieKeywordsQuery, IMovieKeywordsResponse, MovieKeywords }