import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import {
  DiscoverMovie, DiscoverMovieQuery, DiscoverTv, DiscoverTvQuery, Movie, MovieQuery,
} from '../../models/tmdb';

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const tmrevAPI = process.env.NEXT_PUBLIC_TMREV_API;

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
    getMovie: builder.query<Movie, MovieQuery>({
      query: (data) => ({
        url: `/movie/${data.movie_id}?api_key=${apiKey}&append_to_response=credits,release_dates,reviews`,
      }),
      transformResponse: async (response: Movie) => {
        const res = await fetch(`${tmrevAPI}/imdb/${response.imdb_id}`);

        const data = await res.json();

        return {
          ...response,
          imdb: data,
        };
      },
    }),
  }),
  // eslint-disable-next-line consistent-return
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
});

export const {
  useGetDiscoverMovieQuery,
  useGetDiscoverTvQuery,
  useGetMovieQuery,
  util: { getRunningOperationPromises },
} = tmdbApi;

export const { getDiscoverMovie, getDiscoverTv, getMovie } = tmdbApi.endpoints;
