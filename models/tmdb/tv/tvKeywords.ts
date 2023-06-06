import { TvGeneralQuery } from ".";

export interface ITVKeywordsQuery extends TvGeneralQuery { }

export type TVKeywords = {
  name: string
  id: number
}

export interface ITVKeywordsResponse {
  id: number
  results: TVKeywords[]
}