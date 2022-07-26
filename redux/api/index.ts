import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import {
  DiscoverMovie, DiscoverMovieQuery,
  DiscoverTv, DiscoverTvQuery, Movie,
  MovieQuery, SearchMovieQuery,
  SearchMovieResponse,
} from '../../models/tmdb';
import {
  CreateTmrevReviewQuery, CreateTmrevReviewResponse, MovieScore,
  User, UserQuery, WatchList, WatchListSearchQuery,
} from '../../models/tmrev';
import { generateUrl } from '../../utils/common';

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
export const tmrevAPI = process.env.NEXT_PUBLIC_TMREV_API;

export const tmrevApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
    prepareHeaders: (headers) => headers,
  }),
  endpoints: (builder) => ({
    addTmrevReview: builder.mutation<CreateTmrevReviewResponse, CreateTmrevReviewQuery>({
      invalidatesTags: ['TMREV_SCORE'],
      query: (body) => {
        const newBody = structuredClone(body);
        delete newBody.token;

        return {
          body: newBody,
          headers: {
            authorization: body.token,
          },
          method: 'POST',
          url: `${tmrevAPI}/movie`,
        };
      },
    }),
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
      providesTags: ['MOVIE'],
      query: (data) => ({
        url: `/movie/${data.movie_id}?api_key=${apiKey}&append_to_response=credits,release_dates,reviews`,
      }),
      transformResponse: async (response: Movie, _, arg) => {
        const urls = [
          `${tmrevAPI}/imdb/${response.imdb_id}`,
          `${tmrevAPI}/movie/all/${arg.movie_id}`,
        ];
        const requests = urls.map((url) => fetch(url));
        const responses = await Promise.all(requests);
        const promises = responses.map((res) => res.json());

        const movieReviews = await Promise.all(promises);

        return {
          ...response,
          imdb: movieReviews[0] || [],
          tmrevReviews: movieReviews[1],
        };
      },
    }),
    getSearchMovie: builder.query<SearchMovieResponse, SearchMovieQuery>({
      query: (data) => ({
        url: `${generateUrl('https://api.themoviedb.org/3/search/movie', data)}&api_key=${apiKey}`,
      }),
    }),
    getTmrevAvgScore: builder.query<MovieScore, number>({
      providesTags: ['TMREV_SCORE'],
      query: (data) => ({
        url: `${tmrevAPI}/movie/score/${data}`,
      }),
      transformResponse: (response: MovieScore[]) => response[0],
    }),
    getUser: builder.query<User, UserQuery>({
      query: (data) => ({
        url: `${tmrevAPI}/user/full/${data.uid}`,
      }),
      transformResponse: (response: User) => response,
    }),
    getWatchList: builder.query<WatchList[], WatchListSearchQuery>({
      query: (data) => ({
        url: `${tmrevAPI}/watch-list/search?q=${data.q}`,
      }),
    }),
    searchUser: builder.query<User[], string>({
      query: (data) => ({
        url: `${tmrevAPI}/user/search?q=${data}`,
      }),
    }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }

    return null;
  },
  tagTypes: ['MOVIE', 'TMREV_SCORE'],
});

export const {
  useAddTmrevReviewMutation,
  useGetDiscoverMovieQuery,
  useGetDiscoverTvQuery,
  useGetMovieQuery,
  useGetUserQuery,
  useGetTmrevAvgScoreQuery,
  useGetSearchMovieQuery,
  useGetWatchListQuery,
  useSearchUserQuery,
  util: { getRunningOperationPromises },
} = tmrevApi;

export const { getDiscoverMovie, getDiscoverTv, getMovie } = tmrevApi.endpoints;
