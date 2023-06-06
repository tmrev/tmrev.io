import { TvGeneralQuery } from ".";

export interface ITVScreenedTheatricallyQuery extends TvGeneralQuery {
}

type ScreenedTheatrically = {
  id: number
  episode_number: number
  season_number: number
}

export interface ITVScreenedTheatricallyResponse {
  id: number
  results: ScreenedTheatrically[]
}