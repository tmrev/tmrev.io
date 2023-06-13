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