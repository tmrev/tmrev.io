import ISO3166_1 from "../ISO3166-1";
import { IMovieQueryGeneral } from "./tmdbMovie";

interface IMovieWatchProvidersQuery extends IMovieQueryGeneral {

}

type MovieWatchProviders = Record<ISO3166_1, MovieWatchProvidersResult>

type MovieWatchProvidersResult = {
  link: string
  buy: MovieBuy[]
}

type MovieBuy = {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

interface IMovieWatchProvidersResponse {
  id: number
  results: MovieWatchProviders
}

export type {
  IMovieWatchProvidersQuery,
  IMovieWatchProvidersResponse,
  MovieBuy,
  MovieWatchProvidersResult
}