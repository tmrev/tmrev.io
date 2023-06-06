import { ISO639_1 } from "@/models/tmrev/movie";

import { TvGeneralQuery } from ".";

export interface ITVImagesQuery extends TvGeneralQuery { }

export type TVImages = {
  aspect_ratio: number
  height: number
  iso_639_1: ISO639_1
  file_path: string
  vote_average: number
  vote_count: number
  width: null
}

export interface ITVImagesResponse {
  backdrops: TVImages[]
  logos: TVImages[]
  posters: TVImages[]
}