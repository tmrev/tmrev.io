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

export type { WatchList };
