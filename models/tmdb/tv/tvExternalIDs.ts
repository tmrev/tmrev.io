import { TvGeneralQuery } from ".";

export interface ITVExternalIdsQuery extends TvGeneralQuery { }

export interface ITVExternalIdsResponse {
  id: number
  imdb_id?: string
  freebase_mid?: string
  freebase_id?: string
  tvdb_id?: number
  tvrage_id?: number
  wikidata_id?: string
  facebook_id?: string
  instagram_id?: string
  twitter_id?: string
}