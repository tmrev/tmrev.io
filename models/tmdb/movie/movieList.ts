import { ISO639_1 } from "@/models/tmrev/movie";

import { IMovieQueryGeneral } from "./tmdbMovie";

interface IMovieListQuery extends IMovieQueryGeneral {
  params: {
    language?: string
    page: number
  }
}

type MovieList = {
  description: string
  favorite_count: number
  item_count: number
  iso_639_1: ISO639_1
  list_type: "movie"
  name: string
  poster_path: string | null
}

interface IMovieListResponse {
  id: number
  page: number
  results: MovieList[]
}

export type { IMovieListQuery, IMovieListResponse, MovieList }