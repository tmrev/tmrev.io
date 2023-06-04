import ISO3166_1 from "../ISO3166-1"
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

type Titles = {
  iso_3166_1: ISO3166_1
  title: string,
  type: string
}

export type { IMovieAltTitlesQuery, IMovieAltTitlesResponse, Titles }