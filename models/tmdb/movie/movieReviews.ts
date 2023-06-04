import { IMovieQueryGeneral } from "./tmdbMovie";

interface IMovieReviewsQuery extends IMovieQueryGeneral {
  params: {
    language?: string
    page: number
  }
}

type AuthorDetails = {
  name: string
  username: string
  avatar_path: string
  rating: number
}

type MovieReview = {
  author: string
  author_details: AuthorDetails
  content: string
  created_at: string
  id: string
  updated_at: string
  url: string
}

interface IMovieReviewsResponse {
  id: number
  page: number
  results: MovieReview[]
}

export type {
  AuthorDetails,
  IMovieReviewsQuery,
  IMovieReviewsResponse,
  MovieReview
}