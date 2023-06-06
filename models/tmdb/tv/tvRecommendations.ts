import { TVGeneric } from "..";
import { TvGeneralQuery } from ".";

export interface ITVRecommendationsQuery extends TvGeneralQuery {
  params: {
    page: number
    language?: string
  }
}

export interface ITVRecommendationsResponse {
  page: number
  results: TVGeneric[]
  total_pages: number
  total_results: number
}