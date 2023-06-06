import { Titles } from ".."
import { TvGeneralQuery } from "."

export interface ITVAltTitlesQuery extends TvGeneralQuery { }


export interface ITVAltTitlesResponse {
  id: number
  titles: Titles[]
}