import type { Review, WatchList } from '.';

interface User {
  displayName?: string
  photoUrl?: string
  email: string
  _id: string
  uuid: string
  backdropPath?: string
  following?: string[],
  reviews: Review[],
  watchLists: WatchList[]
}

interface UserQuery {
  uid: string
}

export type { User, UserQuery };
