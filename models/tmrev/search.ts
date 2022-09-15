import { SearchMovieResponse } from '../tmdb';
import { User } from './user';
import { WatchList } from './watchList';

interface SearchResponse {
  success: boolean
  body?: Body
  error?: any
}

type Body = {
  watchList: WatchList[],
  user: User[],
  tmdb: SearchMovieResponse
}

export type { SearchResponse };
