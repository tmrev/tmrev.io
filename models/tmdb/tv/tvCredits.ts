import { TvGeneralQuery } from ".";
import { Cast } from "./tvAggrateCredits";

export interface ITVCreditsQuery extends TvGeneralQuery {
  params: {
    language?: string
  }
}

export interface ITVCreditsResponse {
  cast: Cast[]
}