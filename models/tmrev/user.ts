import type { TmrevReview, WatchList } from '.';

interface User {
  displayName?: string
  photoUrl?: string
  email: string
  _id: string
  uuid: string
  following: string[],
  reviews: TmrevReview[],
  watchLists: WatchList[]
  firstName: string
  lastName: string
  link: {
    title: string,
    url: string
  }
  bio: string
  location: string
  public: boolean
}

interface UserQuery {
  uid: string
}

export type { User, UserQuery };
