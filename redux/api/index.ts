import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import {
  DiscoverMovie, DiscoverMovieQuery, MovieQuery,
} from '../../models/tmdb';
import {
  CreateTmrevReviewQuery, CreateTmrevReviewResponse,
  SingleReview,
  User, UserQuery, WatchList,
} from '../../models/tmrev';
import { MovieResponse, ReviewResponse } from '../../models/tmrev/movie';
import { DeleteReviewQuery } from '../../models/tmrev/review';
import { SearchResponse } from '../../models/tmrev/search';
import { AddMovieToWatchList, UpdateWatchList } from '../../models/tmrev/watchList';

export const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
export const tmrevAPI = process.env.NEXT_PUBLIC_TMREV_API;
export const tmdbAPI = 'https://api.themoviedb.org/3/';

export const tmrevApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: tmrevAPI,
    prepareHeaders: (headers) => headers,
  }),
  endpoints: (builder) => ({
    addMovieToWatchList: builder.mutation<void, AddMovieToWatchList>({
      invalidatesTags: ['WATCH_LIST'],
      query: (body) => ({
        body: body.data,
        headers: {
          authorization: body.token,
        },
        method: 'POST',
        url: `/watch-list/${body.listId}`,
      }),
    }),
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
          url: '/movie/review/',
        };
      },
    }),
    deleteTmrevReview: builder.mutation<void, DeleteReviewQuery>({
      invalidatesTags: ['MOVIE'],
      query: (body) => ({
        headers: {
          authorization: body.authToken,
        },
        method: 'DELETE',
        url: `/movie/review/${body.reviewId}`,
      }),
    }),
    getDiscoverMovie: builder.query<DiscoverMovie, DiscoverMovieQuery>({
      query: (data) => ({
        url: `${tmdbAPI}discover/movie?api_key=${apiKey}&page=${data.page}`,
      }),
      transformResponse: (response: DiscoverMovie) => response,
    }),
    getMovie: builder.query<MovieResponse, MovieQuery>({
      providesTags: ['MOVIE'],
      query: (data) => ({
        url: `/movie/${data.movie_id}`,
      }),
    }),
    getSingleReview: builder.query<ReviewResponse, SingleReview>({
      query: (data) => ({
        headers: {
          authorization: data.authToken,
        },
        url: `/movie/review/${data.reviewId}`,
      }),
    }),
    getUser: builder.query<User, UserQuery>({
      query: (data) => ({
        url: `/user/full/${data.uid}`,
      }),
      transformResponse: (response: User) => response,
    }),
    getUserWatchLists: builder.query<WatchList[], string>({
      query: (data) => ({
        headers: {
          authorization: data,
        },
        url: '/watch-list',
      }),
    }),
    search: builder.query<SearchResponse, string>({
      query: (data) => ({
        url: `/search?q=${data}`,
      }),
    }),
    updateTmrevReview: builder.mutation<CreateTmrevReviewResponse, CreateTmrevReviewQuery>({
      invalidatesTags: ['MOVIE'],
      query: (body) => {
        const newBody = structuredClone(body);
        delete newBody.token;

        return {
          body: newBody,
          headers: {
            authorization: body.token,
          },
          method: 'PUT',
          url: `/movie/review/${newBody.tmdbID}`,
        };
      },
    }),
    updateWatchList: builder.mutation<WatchList, UpdateWatchList>({
      invalidatesTags: ['WATCH_LIST'],
      query: (body) => ({
        body: {
          description: body.description,
          movies: body.movies,
          public: body.public,
          tags: body.tags,
          title: body.title,
          userId: body.userId,
        },
        headers: {
          authorization: body.token,
        },
        method: 'PUT',
        url: `/watch-list/${body.watchListId}`,
      }),
    }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }

    return null;
  },
  tagTypes: ['MOVIE', 'TMREV_SCORE', 'WATCH_LIST'],
});

export const {
  useAddTmrevReviewMutation,
  useGetMovieQuery,
  useGetUserQuery,
  useGetUserWatchListsQuery,
  useAddMovieToWatchListMutation,
  useUpdateWatchListMutation,
  useSearchQuery,
  useGetDiscoverMovieQuery,
  useGetSingleReviewQuery,
  useUpdateTmrevReviewMutation,
  useDeleteTmrevReviewMutation,
  util: { getRunningOperationPromises },
} = tmrevApi;

export const { getMovie, getDiscoverMovie } = tmrevApi.endpoints;
