import { TVGeneric } from "..";
import { TvGeneralQuery } from ".";

export interface ITVSimilarQuery extends TvGeneralQuery {
  params: {
    page: number
    language?: string
  }
}

export interface ITVSimilarResponse {
  page: number
  results: TVGeneric[]
  total_pages: number
  total_results: number
}