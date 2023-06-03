import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { CategoryDataResponse } from '@/models/tmrev/categories';

import {
  DiscoverMovie, DiscoverMovieQuery, MovieQuery,
} from '../../models/tmdb';
import { MovieReviewPayload } from '../../models/tmdb/movie';
import {
  CreateTmrevReviewQuery, CreateTmrevReviewResponse,
  SingleReview,
  User, UserQuery, WatchList,
} from '../../models/tmrev';
import {
  BatchMoviesResponse, JustReviewed, MovieResponse, ReviewResponse, TopReviewed,
} from '../../models/tmrev/movie';
import { AllReviewsResponse, DeleteReviewQuery } from '../../models/tmrev/review';
import { SearchResponse } from '../../models/tmrev/search';
import { WatchedDeletePayload, WatchedPayload, WatchedResponse } from '../../models/tmrev/watched';
import { AddMovieToWatchList, GetListPayload, UpdateWatchList } from '../../models/tmrev/watchList';

export const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
export const tmrevAPI = process.env.NEXT_PUBLIC_TMREV_API;
export const tmdbAPI = 'https://api.themoviedb.org/3/';

export const tmrevApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: tmrevAPI,
    prepareHeaders: (headers) => headers,
  }),
  endpoints: (builder) => ({
    addComment: builder.mutation<void, { id: string, comment: string, token: string }>({
      invalidatesTags: ['COMMENT', 'REVIEW', 'MOVIE'],
      query: (data) => ({
        body: {
          comment: data.comment
        },
        headers: {
          authorization: data.token,
        },
        method: 'POST',
        url: `/movie/review/${data.id}/comment`
      })
    }),
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
      invalidatesTags: ['TMREV_SCORE', 'REVIEW', 'MOVIE'],
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
    batchLookUp: builder.query<BatchMoviesResponse, string[]>({
      query: (body) => ({
        body: {
          movieId: body,
        },
        method: 'POST',
        url: '/import/imdb',
      }),
    }),
    batchMovies: builder.query<BatchMoviesResponse, number[]>({
      query: (body) => ({
        body: {
          movieId: body,
        },
        method: 'POST',
        url: '/movie/batch',
      }),
    }),
    categoryRatings: builder.query<CategoryDataResponse, string>({
      providesTags: ['REVIEW', 'MOVIE'],
      query: (uid) => ({
        url: `/user/${uid}/categoryRatings`
      })
    }),
    createWatchList: builder.mutation<WatchList, UpdateWatchList>({
      invalidatesTags: ['WATCH_LIST'],
      query: (body) => ({
        body: {
          description: body.description,
          movies: body.movies,
          public: body.public,
          tags: body.tags,
          title: body.title,
        },
        headers: {
          authorization: body.token,
        },
        method: 'POST',
        url: '/watch-list/',
      }),
    }),
    createWatched: builder.mutation<WatchedResponse, WatchedPayload>({
      invalidatesTags: ['WATCHED', 'MOVIE'],
      query: (body) => ({
        body: {
          liked: body.liked,
          posterPath: body.posterPath,
          title: body.title,
          tmdbID: body.tmdbID,
        },
        headers: {
          authorization: body.authToken,
        },
        method: 'POST',
        url: '/movie/watched',
      }),
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
    deleteWatchList: builder.mutation<void, GetListPayload>({
      invalidatesTags: ['WATCH_LIST'],
      query: (body) => ({
        headers: {
          authorization: body.authToken,
        },
        method: 'DELETE',
        url: `/watch-list/${body.id}`,
      }),
    }),
    deleteWatched: builder.mutation<void, WatchedDeletePayload>({
      invalidatesTags: ['WATCHED', 'MOVIE'],
      query: (body) => ({
        headers: {
          authorization: body.authToken,
        },
        method: 'DELETE',
        url: `/movie/watched/${body.watchedId}`,
      }),
    }),
    followUser: builder.mutation<string, UserQuery>({
      invalidatesTags: ['USER'],
      query: (data) => ({
        headers: {
          authorization: data.authToken,
        },
        method: 'POST',
        url: `/user/follow/${data.uid}`
      }),
    }),
    getAllReviews: builder.query<AllReviewsResponse, MovieReviewPayload>({
      providesTags: ['REVIEW', 'MOVIE', 'COMMENT'],
      query: ({ movie_id, query }) => ({
        params: {
          ...query
        },
        url: `/movie/reviews/${movie_id}`
      }),
    }),
    getDiscoverMovie: builder.query<DiscoverMovie, DiscoverMovieQuery>({
      query: (data) => ({
        url: `${tmdbAPI}discover/movie?api_key=${apiKey}&page=${data.page}`,
      }),
      transformResponse: (response: DiscoverMovie) => response,
    }),
    getJustReviewed: builder.query<JustReviewed, void>({
      query: () => ({
        url: '/movie/just-reviewed',
      }),
    }),
    getList: builder.query<WatchList, GetListPayload>({
      providesTags: ['WATCH_LIST'],
      query: (body) => ({
        headers: {
          authorization: body.authToken,
        },
        url: `/watch-list/${body.id}`,
      }),
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
    getTopReviewed: builder.query<TopReviewed, void>({
      query: () => ({
        url: '/movie/top-reviewed',
      }),
    }),
    getUser: builder.query<User, UserQuery>({
      providesTags: ['USER', 'REVIEW', 'WATCHED', 'WATCH_LIST'],
      query: (data) => ({
        url: `/user/full/${data.uid}`,
      }),
      transformResponse: (response: User) => response,
    }),
    getUserWatchLists: builder.query<WatchList[], string>({
      providesTags: ['WATCH_LIST'],
      query: (data) => ({
        headers: {
          authorization: data,
        },
        url: '/watch-list',
      }),
    }),
    getWatched: builder.query<WatchedResponse, string>({
      providesTags: ['WATCHED', 'MOVIE'],
      query: (userId) => ({
        method: 'GET',
        url: `/movie/watched/${userId}`,
      }),
    }),
    search: builder.query<SearchResponse, string>({
      query: (data) => ({
        url: `/search?q=${data}`
      }),
    }),
    updateTmrevReview: builder.mutation<CreateTmrevReviewResponse, CreateTmrevReviewQuery>({
      invalidatesTags: ['MOVIE', 'COMMENT'],
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
        },
        headers: {
          authorization: body.token,
        },
        method: 'PUT',
        url: `/watch-list/${body.watchListId}`,
      }),
    }),
    updateWatched: builder.mutation<WatchedResponse, WatchedPayload>({
      invalidatesTags: ['WATCHED', 'MOVIE'],
      query: (body) => ({
        body: {
          liked: body.liked,
          posterPath: body.posterPath,
          title: body.title,
          tmdbID: body.tmdbID,
        },
        headers: {
          authorization: body.authToken,
        },
        method: 'PUT',
        url: `/movie/watched/${body._id}`,
      }),
    }),
    voteTmrevReview: builder.mutation<void, { vote: boolean, token: string, reviewId: string }>({
      invalidatesTags: ['COMMENT', 'REVIEW', 'MOVIE'],
      query: (data) => ({
        body: {
          vote: data.vote
        },
        headers: {
          authorization: data.token,
        },
        method: 'POST',
        url: `/movie/review/vote/${data.reviewId}`
      })
    }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }

    return null;
  },
  reducerPath: 'tmrevApi',
  tagTypes: ['MOVIE', 'TMREV_SCORE', 'WATCH_LIST', 'WATCHED', 'USER', 'REVIEW', 'COMMENT'],
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
  useBatchMoviesQuery,
  useCreateWatchedMutation,
  useDeleteWatchedMutation,
  useGetWatchedQuery,
  useUpdateWatchedMutation,
  useGetTopReviewedQuery,
  useGetJustReviewedQuery,
  useBatchLookUpQuery,
  useCreateWatchListMutation,
  useFollowUserMutation,
  useGetAllReviewsQuery,
  useGetListQuery,
  useDeleteWatchListMutation,
  useAddCommentMutation,
  useVoteTmrevReviewMutation,
  useCategoryRatingsQuery,
  util: { getRunningOperationPromises },
} = tmrevApi;

export const {
  getMovie, getDiscoverMovie, batchMovies, getUser, getAllReviews, search,
} = tmrevApi.endpoints;
