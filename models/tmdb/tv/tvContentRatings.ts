import ISO3166_1 from "../ISO3166-1";
import { TvGeneralQuery } from ".";

export interface ITVContentRatingsQuery extends TvGeneralQuery { }

export type ContentRating = {
  descriptors: string[],
  iso_3166_1: ISO3166_1,
  rating: string
}

export interface ITVContentRatingsResponse {
  results: ContentRating[]
}