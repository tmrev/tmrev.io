/* eslint-disable camelcase */

interface IMovieQueryGeneral {
  movie_id: number
}

type MovieGeneral = {
  poster_path?: string
  adult: boolean
  overview: string
  release_date: string
  genre_ids: number[]
  id: number
  original_title: string
  original_language: string
  title: string
  backdrop_path?: string
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
}


export type { IMovieQueryGeneral, MovieGeneral }