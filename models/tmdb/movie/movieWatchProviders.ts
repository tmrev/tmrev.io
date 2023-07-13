import ISO3166_1 from "../ISO3166-1";
import { IMovieQueryGeneral } from "./tmdbMovie";

interface IMovieWatchProvidersQuery extends IMovieQueryGeneral { }

type MovieWatchProviders = Record<ISO3166_1, MovieWatchProvidersResult>

type MovieWatchProvidersResult = {
  link: string
  buy?: Provider[]
  flatrate?: Provider[]
  rent?: Provider[]
}

type Provider = {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

interface IMovieWatchProvidersResponse {
  id: number
  results: MovieWatchProviders
}

interface IRetrieveWatchProvidersQuery {
  params?: {
    language?: string
    watch_region?: string
  }
}

type RetrieveWatchProvidersResult = {
  display_priorities: Record<ISO3166_1, number>
  display_priority: number
  logo_path: string
  provider_name: string
  provider_id: number
}

interface IRetrieveWatchProvidersResponse {
  results: RetrieveWatchProvidersResult[]
}

export type {
  IMovieWatchProvidersQuery,
  IMovieWatchProvidersResponse,
  IRetrieveWatchProvidersQuery,
  IRetrieveWatchProvidersResponse,
  Provider as MovieBuy,
  MovieWatchProvidersResult
}