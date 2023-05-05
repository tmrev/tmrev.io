import { KnownForMovie, KnownForTV } from ".."
import Iso6391Code from "../ISO639-1"

interface PersonDetail {
  birthday?: string
  known_for_department: string
  deathday?: string
  id: number
  name: string
  also_known_as: string[]
  gender: number
  biography: string
  popularity: number
  place_of_birth?: string
  profile_path?: string
  adult: boolean
  imdb_id: string
  homepage?: string
}

interface PersonQuery {
  personId: number
  language?: Iso6391Code
  page?: number
}

interface PeopleQuery {
  language?: Iso6391Code
  page: number
}

interface PersonMovieCredit {
  cast: Cast[]
  crew: Crew[]
  id: number
}

interface PersonTVCredit {
  cast: Cast[]
  crew: Cast[]
  id: number
}

interface PersonCombineCredit {
  cast: Cast[]
  crew: Cast[]
  id: number
}

interface PersonExternalIds {
  imdb_id?: string
  facebook_id?: string
  freebase_mid?: string
  freebase_id?: string
  tvrage_id?: number
  twitter_id?: string
  id: number
  instagram_id?: string
}

interface PersonImages {
  id: number
  profiles: Image[]
}

interface PersonTaggedImages {
  id: number
  page: number
  resulted: TaggedImage[]
  total_pages: number
  total_results: number
}

interface PersonTranslations {
  id: number
  translations: Translations[]
}

type PeopleGeneral = {
  profile_path: string
  adult: boolean
  id: number
  known_for: KnownForMovie | KnownForTV
  name: string
  popularity: number
}

interface PopularPeople {
  page: number
  results: PeopleGeneral[]
  total_results: number
  total_pages: number
}

type TaggedImage = {
  aspect_ratio: number
  file_path: string
  height: number
  id: string
  iso_639_1?: string
  vote_average: number
  vote_count: number
  width: number
  image_type: string
  media: Media
  media_type: string
}

type Media = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  _id: string
  id: number
  original_language: string
  original_title: string
  overview: string
  release_date: string
  poster_path: string
  popularity: number
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

type Cast = {
  character: string
  credit_id: string
  release_date: string
  vote_count: number
  video: boolean
  adult: boolean
  vote_average: number
  title: string
  genre_ids: number[]
  original_language: string
  original_title: string
  popularity: number
  id: number
  backdrop_path?: string
  overview: string
  poster_path?: string
}

type Crew = {
  id: number
  department: string
  original_language: string
  original_title: string
  job: string
  overview: string
  vote_count: number
  video: boolean
  poster_path?: string
  backdrop_path?: string
  title: string
  popularity: number
  genre_ids: number[]
  vote_average: number
  adult: boolean
  release_date: string
  credit_id: string
}

type Image = {
  aspect_ratio: number
  file_path: string
  height: number
  iso_639_1: any
  vote_average: number
  vote_count: number
  width: number
}

type Translations = {
  iso_639_1: string
  iso_3166_1: string
  name: string
  english_name: string
  data: {
    biography: string
  }
}

export type {
  PeopleGeneral,
  PeopleQuery,
  PersonCombineCredit,
  PersonDetail,
  PersonExternalIds,
  PersonImages,
  PersonMovieCredit,
  PersonQuery,
  PersonTaggedImages,
  PersonTranslations,
  PersonTVCredit,
  PopularPeople
}