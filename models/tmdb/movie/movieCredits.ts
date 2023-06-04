import { IMovieQueryGeneral } from "./tmdbMovie"

interface IMovieCreditsQuery extends IMovieQueryGeneral {
  params: {
    language?: string
  }
}

type Cast = {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: number
  order: number
}

interface IMovieCreditsResponse {
  id: number
  cast: Cast[]
}

export type { Cast, IMovieCreditsQuery, IMovieCreditsResponse }