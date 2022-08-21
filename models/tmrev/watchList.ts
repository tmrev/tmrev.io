interface WatchList {
  _id: string,
  description: string,
  public: boolean,
  title: string,
  userId: string
  movies: number[]
  created_at: {
    _seconds: number,
    _nanoseconds: number
  },
  updated_at: {
    _seconds: number,
    _nanoseconds: number
  },
  tags: string[]
}

interface WatchListSearchQuery {
  q: string
}

interface AddMovieToWatchList {
  token: string
  listId: string
  data: {
    id: number
  }
}

interface UpdateWatchList {
  token: string,
  description: string,
  title: string,
  public: boolean,
  tags: string[],
  userId: string
  movies: number[],
  watchListId: string
}

export type {
  AddMovieToWatchList, UpdateWatchList, WatchList, WatchListSearchQuery,
};
