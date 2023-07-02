interface IMovieGenreListQuery { }

type Genre = {
  id: number
  name: string
}

interface IMovieGenreListResponse {
  genres: Genre[]
}

export type { Genre, IMovieGenreListQuery, IMovieGenreListResponse }