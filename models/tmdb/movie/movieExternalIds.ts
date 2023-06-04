import { IMovieQueryGeneral } from "./tmdbMovie";

interface IMovieExternalIdsQuery extends IMovieQueryGeneral { }

interface IMovieExternalIdsResponse {
  id: number
  imdb_id: string,
  wikidata_id?: string,
  facebook_id?: string,
  instagram_id?: string,
  twitter_id?: string
}

export type { IMovieExternalIdsQuery, IMovieExternalIdsResponse }