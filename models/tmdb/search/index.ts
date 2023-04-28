import Iso6391Code from "../ISO639-1"
import type { MovieGeneral } from "../movie/tmdbMovie"
import { PeopleGeneral } from "../person"

interface IBaseSearchQuery {
  page?: number
  query: string
  language?: Iso6391Code
}

interface IBaseSearchResponse {
  results: any[]
  page: number
  total_pages: number
  total_results: number
}

type CompanyResults = {
  id: number
  logo_path?: string
  name: string
}

type CollectionResults = {
  id: number
  backdrop_path?: string
  name: string
  poster_path?: string
}

type KeywordResults = {
  id: number
  name: string
}

interface IFindCompanyResponse extends IBaseSearchResponse {
  results: CompanyResults[]
}

interface IFindCollectionResponse extends IBaseSearchResponse {
  results: CollectionResults[]
}

interface IFindKeywordsResponse extends IBaseSearchResponse {
  results: KeywordResults[]
}

interface IFindMoviesResponse extends IBaseSearchResponse {
  results: MovieGeneral[]
}

interface IFindMultiResponse extends IBaseSearchResponse {
}

interface IFindPeopleResponse extends IBaseSearchResponse {
  results: PeopleGeneral[]
}

interface IFindTvResponse extends IBaseSearchResponse {

}


export type {
  CompanyResults,
  IBaseSearchQuery,
  IBaseSearchResponse,
  IFindCollectionResponse,
  IFindCompanyResponse,
  IFindKeywordsResponse,
  IFindMoviesResponse,
  IFindMultiResponse,
  IFindPeopleResponse,
  IFindTvResponse
}