import { Translations } from "../movie/movieTranslations";
import { TvGeneralQuery } from ".";

export interface ITVTranslationsQuery extends TvGeneralQuery { }

export interface ITVTranslationsResponse {
  id: number
  translations: Translations[]
}
