import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  DiscoverMovie, DiscoverMovieQuery, DiscoverTv, DiscoverTvQuery,
} from '../../models/tmdb';

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const tmdbApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
    prepareHeaders: (headers) => headers,
  }),
  endpoints: (builder) => ({
    getDiscoverMovie: builder.query<DiscoverMovie, DiscoverMovieQuery>({
      query: (data) => ({
        url: `/discover/movie?api_key=${apiKey}&page=${data.page}`,
      }),
      transformResponse: (response: DiscoverMovie) => response,
    }),
    getDiscoverTv: builder.query<DiscoverTv, DiscoverTvQuery>({
      query: (data) => ({
        url: `/discover/tv?api_key=${apiKey}&page=${data.page}`,
      }),
      transformResponse: (response: DiscoverTv) => response,
    }),
  }),
});

export const { useGetDiscoverMovieQuery, useGetDiscoverTvQuery } = tmdbApi;
