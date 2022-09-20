/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'm.media-amazon.com',
      'img.omdbapi.com',
      'media.giphy.com',
      'resizing.flixster.com',
      'staticv2-4.rottentomatoes.com',
      'lh3.googleusercontent.com',
      'www.rottentomatoes.com',
      'avatars.dicebear.com',
      'image.tmdb.org',
    ],
  },
  optimizeFonts: false,
  reactStrictMode: true,
};

module.exports = nextConfig;
