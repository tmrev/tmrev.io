import 'server-only';

import { MovieResponse } from '../../../models/tmrev/movie';

const getMovie = async (id: string): Promise<MovieResponse> => {
  const res = await fetch(`${process.env.TMREV_API}/movie/${id}`);

  return res.json();
};

export default getMovie;
