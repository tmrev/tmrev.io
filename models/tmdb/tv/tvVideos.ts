import { MovieVideo } from "../movie/movieVideos";
import { TvGeneralQuery } from ".";

export interface ITVVideosQuery extends TvGeneralQuery {
  params: {
    language?: string
    include_video_language?: string
  }
}


export interface ITVVideosResponse {
  id: number
  results: MovieVideo[]
}
