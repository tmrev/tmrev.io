import ISO3166_1 from "../ISO3166-1"
import { MovieGeneral } from "./tmdbMovie"

interface IMoviePopularQuery {
  params: {
    language?: string
    page: number
    region?: ISO3166_1
  }
}

interface IMoviePopularResponse {
  page: number
  results: MovieGeneral[]
}

export type { IMoviePopularQuery, IMoviePopularResponse }