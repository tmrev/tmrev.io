/* eslint-disable no-unused-vars */

type Consensus = {
  positive: number
  negative: number
  neutral: number
}

export enum Sentiment {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  NEUTRAL = 'neutral'
}


export type NewsResults = {
  _id: string
  url: string | null
  author: string | null
  img: string | null
  snippet: string | null
  source: string | null
  title: string | null
  type: string | null
  publishedDate: string | null
  sentiment: Sentiment
}

export type TrendingResults = {
  title: string
  url: string
  snippet: string
  img: string
  hashtags: string[]
  publishedDate: string
  author: string
  type: "Twitter"
}

type GatherNewsBody = {
  consensus: Consensus
  totalResults: number
  results: NewsResults[]
}

export interface NewsResponse {
  success: boolean
  body: {
    count: number
    results: NewsResults[]
  }
}

export interface NewsSearchResponse {
  success: boolean
  body: {
    totalArticles: number
    results: NewsResults[]
  }
}

export interface GatherNewsResponse {
  success: boolean
  body: GatherNewsBody
}

export interface NewsQuery {
  q: string
  limit?: number,
  offset?: number
}

export interface TrendingNewsQuery {
  limit?: number
}

export interface TrendingNewsResponse {
  success: boolean
  body: TrendingResults[]
}