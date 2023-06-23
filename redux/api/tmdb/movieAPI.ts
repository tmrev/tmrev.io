import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { tmdbAPIKey, tmdbBaseUrl } from '@/constants';
import { IMovieAltTitlesQuery, IMovieAltTitlesResponse } from '@/models/tmdb/movie/movieAltTitles';
import { IMovieCreditsQuery, IMovieCreditsResponse } from '@/models/tmdb/movie/movieCredits';
import { IMovieDetailQuery, IMovieDetailResponse } from '@/models/tmdb/movie/movieDetails';
import { IMovieDiscoverQuery, IMovieDiscoverResponse } from '@/models/tmdb/movie/movieDiscover';
import { IMovieExternalIdsQuery, IMovieExternalIdsResponse } from '@/models/tmdb/movie/movieExternalIds';
import { IMovieImageResponse, IMovieImagesQuery } from '@/models/tmdb/movie/movieImages';
import { IMovieKeywordsQuery, IMovieKeywordsResponse } from '@/models/tmdb/movie/movieKeywords';
import { IMovieListQuery, IMovieListResponse } from '@/models/tmdb/movie/movieList';
import { IMoviePopularQuery, IMoviePopularResponse } from '@/models/tmdb/movie/moviePopular';
import { IMovieRecommendationResponse, IMovieRecommendationsQuery } from '@/models/tmdb/movie/movieRecommendations';
import { IMovieReleaseDatesQuery, IMovieReleaseDatesResponse } from '@/models/tmdb/movie/movieReleaseDates';
import { IMovieReviewsQuery, IMovieReviewsResponse } from '@/models/tmdb/movie/movieReviews';
import { IMovieSimilarQuery, IMovieSimilarResponse } from '@/models/tmdb/movie/movieSimilar';
import { IMovieTranslationsQuery, IMovieTranslationsResponse } from '@/models/tmdb/movie/movieTranslations';
import { IMovieVideosQuery, IMovieVideosResponse } from '@/models/tmdb/movie/movieVideos';
import { IMovieWatchProvidersQuery, IMovieWatchProvidersResponse } from '@/models/tmdb/movie/movieWatchProviders';

export const movieApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${tmdbBaseUrl}`,
    prepareHeaders: (headers) => headers
  }),
  endpoints: (builder) => ({
    getAlternativeTitles: builder.query<IMovieAltTitlesResponse, IMovieAltTitlesQuery>({
      query: ({ movie_id, params }) => ({
        params: {
          api_key: tmdbAPIKey,
          ...params
        },
        url: `/movie/${movie_id}/alternative_titles`
      })
    }),
    getMovieChanges: builder.query({
      query: (data) => ({
        params: {
          api_key: tmdbAPIKey,
        },
        url: `/movie/${data}/changes`
      })
    }),
    getMovieCredits: builder.query<IMovieCreditsResponse, IMovieCreditsQuery>({
      query: ({ movie_id, params }) => ({
        params: {
          api_key: tmdbAPIKey,
          ...params
        },
        url: `/movie/${movie_id}/credits`
      })
    }),
    getMovieDetails: builder.query<IMovieDetailResponse, IMovieDetailQuery>({
      query: ({ movie_id, params }) => ({
        params: {
          api_key: tmdbAPIKey,
          ...params
        },
        url: `/movie/${movie_id}`
      })
    }),
    getMovieDiscover: builder.query<IMovieDiscoverResponse, IMovieDiscoverQuery>({
      query: ({ params }) => ({
        params: {
          api_key: tmdbAPIKey,
          ...params
        },
        url: `/discover/movie`
      })
    }),
    getMovieExternalIds: builder.query<IMovieExternalIdsResponse, IMovieExternalIdsQuery>({
      query: ({ movie_id }) => ({
        params: {
          api_key: tmdbAPIKey,
        },
        url: `/movie/${movie_id}/external_ids`
      })
    }),
    getMovieImages: builder.query<IMovieImageResponse, IMovieImagesQuery>({
      query: ({ movie_id, params }) => ({
        params: {
          api_key: tmdbAPIKey,
          ...params
        },
        url: `/movie/${movie_id}/images`
      })
    }),
    getMovieKeywords: builder.query<IMovieKeywordsResponse, IMovieKeywordsQuery>({
      query: ({ movie_id }) => ({
        params: {
          api_key: tmdbAPIKey,
        },
        url: `/movie/${movie_id}/keywords`
      })
    }),
    getMovieLatest: builder.query<IMovieDetailResponse, void>({
      query: () => ({
        params: {
          api_key: tmdbAPIKey,
        },
        url: `/movie/latest`
      })
    }),
    getMovieLists: builder.query<IMovieListResponse, IMovieListQuery>({
      query: ({ movie_id, params }) => ({
        params: {
          api_key: tmdbAPIKey,
          ...params
        },
        url: `/movie/${movie_id}/lists`
      })
    }),
    getMovieRecommendations: builder.query<IMovieRecommendationResponse, IMovieRecommendationsQuery>({
      query: ({ movie_id, params }) => ({
        params: {
          api_key: tmdbAPIKey,
          ...params
        },
        url: `/movie/${movie_id}/recommendations`
      })
    }),
    getMovieReleaseDates: builder.query<IMovieReleaseDatesResponse, IMovieReleaseDatesQuery>({
      query: ({ movie_id }) => ({
        params: {
          api_key: tmdbAPIKey,
        },
        url: `/movie/${movie_id}/release_dates`
      })
    }),
    getMovieReviews: builder.query<IMovieReviewsResponse, IMovieReviewsQuery>({
      query: ({ movie_id, params }) => ({
        params: {
          api_key: tmdbAPIKey,
          ...params
        },
        url: `/movie/${movie_id}/reviews`
      })
    }),
    getMovieSimilar: builder.query<IMovieSimilarResponse, IMovieSimilarQuery>({
      query: ({ movie_id, params }) => ({
        params: {
          api_key: tmdbAPIKey,
          ...params
        },
        url: `/movie/${movie_id}/similar`
      })
    }),
    getMovieTranslations: builder.query<IMovieTranslationsResponse, IMovieTranslationsQuery>({
      query: ({ movie_id }) => ({
        params: {
          api_key: tmdbAPIKey,
        },
        url: `/movie/${movie_id}/translations`
      })
    }),
    getMovieVideos: builder.query<IMovieVideosResponse, IMovieVideosQuery>({
      query: ({ movie_id, params }) => ({
        params: {
          api_key: tmdbAPIKey,
          ...params
        },
        url: `/movie/${movie_id}/videos`
      })
    }),
    getMovieWatchProviders: builder.query<IMovieWatchProvidersResponse, IMovieWatchProvidersQuery>({
      query: ({ movie_id }) => ({
        params: {
          api_key: tmdbAPIKey,
        },
        url: `/movie/${movie_id}/watch/providers`
      })
    }),
    getPopularMovies: builder.query<IMoviePopularResponse, IMoviePopularQuery>({
      query: ({ params }) => ({
        params: {
          api_key: tmdbAPIKey,
          ...params
        },
        url: `/movie/popular`
      })
    })
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }

    return null;
  },
  reducerPath: 'movieApi'
})


export const {
  useGetAlternativeTitlesQuery,
  useGetMovieChangesQuery,
  useGetMovieCreditsQuery,
  useGetMovieDetailsQuery,
  useGetMovieExternalIdsQuery,
  useGetMovieImagesQuery,
  useGetMovieKeywordsQuery,
  useGetMovieLatestQuery,
  useGetMovieListsQuery,
  useGetMovieRecommendationsQuery,
  useGetMovieReleaseDatesQuery,
  useGetMovieReviewsQuery,
  useGetMovieSimilarQuery,
  useGetMovieTranslationsQuery,
  useGetMovieVideosQuery,
  useGetMovieWatchProvidersQuery,
  useGetPopularMoviesQuery,
  useGetMovieDiscoverQuery
} = movieApi