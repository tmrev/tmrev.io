import { Movie, WatchProviderResponse } from '../tmdb';
import { TmrevReview } from './review';

/* eslint-disable no-unused-vars */
export interface MovieResponse {
  success: boolean;
  body: Body;
}

export interface Body {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: Credits;
  release_dates: ReleaseDates;
  reviews: Reviews;
  tmrev: Tmrev;
  imdb: Imdb;
  watchProvider: WatchProviderResponse | null
}

export interface Credits {
  cast: Cast[];
  crew: Cast[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: string;
  job?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Imdb {
  _id: string;
  uid: string;
  titleType: string;
  primaryTitle: string;
  originalTitle: string;
  isAdult: string;
  startYear: string;
  endYear: string;
  runtimeMinutes: string;
  genres: string;
  averageRating: string;
  numVotes: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface ReleaseDates {
  results: ReleaseDatesResult[];
}

export interface ReleaseDatesResult {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

export interface ReleaseDate {
  certification: string;
  iso_639_1: ISO639_1;
  note: Note;
  release_date: string;
  type: number;
}

export enum ISO639_1 {
  Empty = '',
  Es = 'es',
  Th = 'th',
}

export enum Note {
  LosAngelesCalifornia = 'Los Angeles, California',
  Netflix = 'Netflix',
}

export interface Reviews {
  page: number;
  results: ReviewsResult[];
  total_pages: number;
  total_results: number;
}

export interface ReviewsResult {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: null | string;
  rating: number;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Tmrev {
  reviews: Review[];
  avgScore: Score;
  likes: number;
  dislikes: number;
}

export interface Score {
  _id?: ID;
  totalScore: number;
  plot: number;
  theme: number;
  climax: number;
  ending: number;
  acting: number;
  characters: number;
  music: number;
  cinematography: number;
  visuals: number;
  personalScore: number;
}

export interface ID {
  tmdbID: number;
  title: string;
}

export interface ReviewResponse {
  body?: Review
  success: boolean
  error?: any
}

export interface Review {
  _id: string;
  createdAt: TimeStamp;
  updatedAt: TimeStamp;
  userId: string;
  averagedAdvancedScore: number;
  user: string;
  notes: string;
  tmdbID: number;
  reviewedDate: string;
  advancedScore: Score;
  public: boolean;
  release_date: string;
  title: string;
  profile: Profile;
}

export interface TimeStamp {
  nanoseconds: number;
  seconds: number;
}

export interface Profile {
  _id: string;
  email: string;
  uuid: string;
  backdropPath?: string;
  following?: string[];
  firstName: string;
  lastName: string;
  photoUrl?: string
}

export type BatchMovies = {[x: string]: Movie }

export type IMDBMovie = {
  _id: string
  uid: string
  titleType: string
  primaryTitle: string
  originalTitle: string
  isAdult: '0' | '1'
  startYear: string
  endYear: string | '\\N'
  runtimeMinutes: string
  genres: string
  averageRating: string
  numVotes: string
  lastModified: Date
}

export interface IMDBBatchMoviesResponse {
  success: boolean
  body: BatchMovies
  error?: any
}

export interface LetterBoxdBatchMovieResponse {
  success: boolean
  body: {[x:string]: IMDBMovie}
  error?: any
}

export interface TopReviewed {
  success: boolean
  body: TopReviewedBody[]
}

export type TopReviewedBody = {
  _id: number
  count: number
}

export interface JustReviewed {
  success: boolean
  body: JustReviewedBody
}

export type JustReviewedBody = {
  movies: TmrevReview[],
  count: number
}
