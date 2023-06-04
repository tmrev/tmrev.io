import { ISO639_1 } from "@/models/tmrev/movie";

import ISO3166_1 from "../ISO3166-1";
import { IMovieQueryGeneral } from "./tmdbMovie";

interface IMovieReleaseDatesQuery extends IMovieQueryGeneral {

}

type ReleaseDateResult = {
  iso_3166_1: ISO3166_1
  release_dates: ReleaseDate[]
}

type ReleaseDate = {
  certification: string
  descriptors: string[]
  iso_639_1: ISO639_1
  note: string
  release_date: string
  type: number
}

interface IMovieReleaseDatesResponse {
  id: number
  results: ReleaseDateResult[]
}

export type {
  IMovieReleaseDatesQuery,
  IMovieReleaseDatesResponse,
  ReleaseDate,
  ReleaseDateResult
}