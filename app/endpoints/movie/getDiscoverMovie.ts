import 'server-only';

import { DiscoverMovie, DiscoverMovieQuery } from '../../../models/tmdb';

const { TMDB_API_URL, TMDB_API_KEY } = process.env;

const getDiscoverMovie = async (payload: DiscoverMovieQuery): Promise<DiscoverMovie> => {
  const res = await fetch(`${TMDB_API_URL}discover/movie?api_key=${TMDB_API_KEY}&page=${payload.page}`);

  return res.json();
};

export default getDiscoverMovie;
