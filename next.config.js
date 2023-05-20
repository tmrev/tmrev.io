/** @type {import('next').NextConfig} */
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const fs = require('fs');

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
      'encrypted-tbn0.gstatic.com'
    ],
  },
  optimizeFonts: false,
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      import('./scripts/generate-sitemap.js');

      const fileContent = `const env = ${JSON.stringify(process.env)};`;

      // The path of the file
      const filePath = path.join(__dirname, 'public', 'env.js');

      // Create the file
      fs.writeFileSync(filePath, fileContent, 'utf8');

      // Configure webpack to copy the file to the public folder
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            { from: 'public', to: '' },
          ],
        })
      );
    }

    return config;
  },
};

module.exports = nextConfig;
