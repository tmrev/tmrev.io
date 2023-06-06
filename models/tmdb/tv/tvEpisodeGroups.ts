import { TvGeneralQuery } from ".";

export interface ITVEpisodeGroupsQuery extends TvGeneralQuery { }

type Results = {
  description: string
  episode_count: number
  group_count: number
  id: string
  name: string
  type: number
  network: Network[]
}

export type Network = {
  id: number
  logo_path: string
  name: string
  origin_county: string
}

export interface ITVEpisodeGroupsResponse {
  results: Results
}