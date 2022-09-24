import type { TmrevReview, WatchList } from '.';

interface User {
  displayName?: string
  photoUrl?: string
  email: string
  _id: string
  uuid: string
  backdropPath?: string
  following?: string[],
  reviews: TmrevReview[],
  watchLists: WatchList[]
  firstName: string
  lastName: string
}

interface UserQuery {
  uid: string
}

export type { User, UserQuery };
