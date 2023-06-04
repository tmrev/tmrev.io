import { IMovieQueryGeneral, MovieGeneral } from "./tmdbMovie"

interface IMovieDetailQuery extends IMovieQueryGeneral {
  params: {
    append_to_response?: string
    language?: string
  }
}

interface IMovieDetailResponse extends MovieGeneral { }

export type { IMovieDetailQuery, IMovieDetailResponse }