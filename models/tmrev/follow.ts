import { TmrevReview } from "./review"
import { TmrevUser } from "./user"

export interface RetrieveFollowerResponse {
  success: boolean
  body: RetrieveFollowerResult
}

export interface RetrieveFollowerResult {
  total: number
  followers: TmrevUser[]
  page: number,
  pageSize: number
}

export interface RetrieveFollowingResponse {
  success: boolean
  body: RetrieveFollowingResult
}

export interface RetrieveFollowingResult {
  total: number
  following: TmrevUser[]
  page: number,
  pageSize: number
}

export interface RetrieveFollowQuery {
  page: number
  pageSize: number
  accountId: string
}

export type ReviewFeed = {
  reviewData: TmrevReview
  author: TmrevUser
  timestamp: string
}


export interface RetrieveFollowerFeedResponse {
  success: boolean
  body: {
    _id: string
    userId: string
    reviews: ReviewFeed[]
    comments: []
    polls: []
    lists: []
    watched: []
  }
}