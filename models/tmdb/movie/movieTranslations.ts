import { ISO639_1 } from "@/models/tmrev/movie";

import ISO3166_1 from "../ISO3166-1";
import { IMovieQueryGeneral } from "./tmdbMovie";

interface IMovieTranslationsQuery extends IMovieQueryGeneral {

}

type Translations = {
  iso_3166_1: ISO3166_1
  iso_639_1: ISO639_1
  name: string
  english_name: string
  data: {
    homepage: string
    overview: string
    runtime: number
    tagline: string
    title: string
  }
}

interface IMovieTranslationsResponse {
  id: number
  translations: Translations[]
}

export type { IMovieTranslationsQuery, IMovieTranslationsResponse, Translations }