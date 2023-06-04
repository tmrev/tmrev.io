/* eslint-disable no-unused-vars */
import { ISO639_1 } from "@/models/tmrev/movie";

import ISO3166_1 from "../ISO3166-1";
import { IMovieQueryGeneral } from "./tmdbMovie";

interface IMovieVideosQuery extends IMovieQueryGeneral {
  params: {
    language?: string
  }
}

enum MovieVideoType {
  TEASER = 'Teaser',
  TRAILER = 'Trailer',
  FEATURETTE = 'Featurette'
}

type MovieVideo = {
  iso_639_1: ISO639_1
  iso_3166_1: ISO3166_1
  name: string
  key: string
  site: string
  size: number
  type: MovieVideoType
  official: boolean
  published_at: string
  id: string
}

interface IMovieVideosResponse {
  id: number
  results: MovieVideo[]
}

export { MovieVideoType }

export type { IMovieVideosQuery, IMovieVideosResponse, MovieVideo }