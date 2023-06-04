import { IMovieQueryGeneral } from "./tmdbMovie";

interface IMovieImagesQuery extends IMovieQueryGeneral {
  params: {
    include_image_language?: string,
    language?: string
  }
}

type MovieImage = {
  aspect_ratio: number,
  height: number,
  iso_631_1: any,
  file_path: string,
  vote_average: number
  vote_count: number
  width: number
}

interface IMovieImageResponse {
  backdrops: MovieImage[]
}

export type { IMovieImageResponse, IMovieImagesQuery, MovieImage }