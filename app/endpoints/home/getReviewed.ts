import 'server-only';

import getJustReviewed from '../review/getJustReviewed';
import getTopReviewed from '../review/getTopReviewed';

const getReviewed = async () => {
  const topMovies = await getTopReviewed();
  const justReviewed = await getJustReviewed();

  return {
    justReviewed,
    topMovies,
  };
};

export default getReviewed;
