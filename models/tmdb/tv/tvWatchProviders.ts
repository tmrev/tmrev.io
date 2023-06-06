import ISO3166_1 from "../ISO3166-1";
import { TvGeneralQuery } from ".";


export interface ITVWatchProvidersQuery extends TvGeneralQuery {

}

export type TVWatchProviders = Record<ISO3166_1, TVWatchProvidersResult>

export type TVWatchProvidersResult = {
  link: string
  buy: TVFlatrate[]
}

type TVFlatrate = {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface ITVWatchProvidersResponse {
  id: number
  results: TVWatchProviders
}