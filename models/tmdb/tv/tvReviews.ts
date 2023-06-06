import { TvGeneralQuery } from "."


interface ITVReviewsQuery extends TvGeneralQuery {
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

type TVReview = {
  author: string
  author_details: AuthorDetails
  content: string
  created_at: string
  id: string
  updated_at: string
  url: string
}

interface ITVReviewsResponse {
  id: number
  page: number
  results: TVReview[]
}

export type {
  ITVReviewsQuery,
  ITVReviewsResponse,
  TVReview
}