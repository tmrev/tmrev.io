import { TimeStamp } from './movie';

interface WatchedResponse {
  success: boolean,
  body: Watched[],
  error?: any
}

interface WatchedPayload {
  liked: boolean
  posterPath: string
  title: string
  tmdbID: number
  authToken: string
  _id?:string
}

interface WatchedDeletePayload {
  authToken: string
  watchedId: string
}

type Watched = {
  _id: string
  liked: boolean
  posterPath: string
  title: string
  tmdbID: number
  createdAt: TimeStamp
  updatedAt: TimeStamp
  userId: string
  user: string
}

export type {
  Watched, WatchedDeletePayload, WatchedPayload, WatchedResponse,
};
