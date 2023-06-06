import { Titles } from ".."
import { IMovieQueryGeneral } from "./tmdbMovie"

interface IMovieAltTitlesQuery extends IMovieQueryGeneral {
  params: {
    country?: string
  }
}

interface IMovieAltTitlesResponse {
  id: number
  titles: Titles[]
}



export type { IMovieAltTitlesQuery, IMovieAltTitlesResponse, Titles }