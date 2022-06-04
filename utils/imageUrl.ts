const imageUrl = (path: string, w?: number, resized = true) => {
  if (resized && w) {
    return `https://image.tmdb.org/t/p/w${w}${path}`;
  }

  return `https://image.tmdb.org/t/p/original${path}`;
};

export default imageUrl;
