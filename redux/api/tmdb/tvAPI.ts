import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { tmdbAPIKey, tmdbBaseUrl } from '@/constants';
import { ITVAggregateCreditsQuery, ITVAggregateCreditsResponse } from '@/models/tmdb/tv/tvAggrateCredits';
import { ITVAltTitlesQuery, ITVAltTitlesResponse } from '@/models/tmdb/tv/tvAltTitles';
import { ITVContentRatingsQuery, ITVContentRatingsResponse } from '@/models/tmdb/tv/tvContentRatings';
import { ITVCreditsQuery, ITVCreditsResponse } from '@/models/tmdb/tv/tvCredits';
import { ITVDetailQuery, ITVDetailResponse } from '@/models/tmdb/tv/tvDetails';
import { ITVEpisodeGroupsQuery, ITVEpisodeGroupsResponse } from '@/models/tmdb/tv/tvEpisodeGroups';
import { ITVExternalIdsQuery, ITVExternalIdsResponse } from '@/models/tmdb/tv/tvExternalIDs';
import { ITVImagesQuery, ITVImagesResponse } from '@/models/tmdb/tv/tvImages';
import { ITVKeywordsQuery, ITVKeywordsResponse } from '@/models/tmdb/tv/tvKeywords';
import { ITVLatestResponse } from '@/models/tmdb/tv/tvLatest';
import { ITVRecommendationsQuery, ITVRecommendationsResponse } from '@/models/tmdb/tv/tvRecommendations';
import { ITVReviewsQuery, ITVReviewsResponse } from '@/models/tmdb/tv/tvReviews';
import { ITVScreenedTheatricallyQuery, ITVScreenedTheatricallyResponse } from '@/models/tmdb/tv/tvScreenedTheatrically';
import { ITVSimilarQuery, ITVSimilarResponse } from '@/models/tmdb/tv/tvSimilar';
import { ITVTranslationsQuery, ITVTranslationsResponse } from '@/models/tmdb/tv/tvTranslations';
import { ITVVideosQuery, ITVVideosResponse } from '@/models/tmdb/tv/tvVideos';
import { ITVWatchProvidersQuery, ITVWatchProvidersResponse } from '@/models/tmdb/tv/tvWatchProviders';


export const tvApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${tmdbBaseUrl}`,
    prepareHeaders: (headers) => headers
  }),
  endpoints: (builder) => ({
    getTvAggregateCredits: builder.query<ITVAggregateCreditsResponse, ITVAggregateCreditsQuery>({
      query: ({ series_id, params }) => ({
        params: {
          api_key: tmdbAPIKey,
          ...params
        },
        url: `/tv/${series_id}/aggregate_credits`
      })
    }),
    getTvAltTitles: builder.query<ITVAltTitlesResponse, ITVAltTitlesQuery>({
      query: ({ series_id }) => ({
        params: {
          api_key: tmdbAPIKey,
        },
        url: `/tv/${series_id}/alternative_titles`
      })
    }),
    getTvContentRatings: builder.query<ITVContentRatingsResponse, ITVContentRatingsQuery>({
      query: ({ series_id }) => ({
        params: {
          api_key: tmdbAPIKey,
        },
        url: `/tv/${series_id}/content_ratings`
      })
    }),
    getTvCredits: builder.query<ITVCreditsResponse, ITVCreditsQuery>({
      query: ({ series_id, params }) => ({
        params: {
          api_key: tmdbAPIKey,
          ...params
        },
        url: `/tv/${series_id}/credits`
      })
    }),
    getTvDetails: builder.query<ITVDetailResponse, ITVDetailQuery>({
      query: ({ series_id, params }) => ({
        params: {
          api_key: tmdbAPIKey,
          ...params
        },
        url: `/tv/${series_id}`
      })
    }),
    getTvEpisodeGroups: builder.query<ITVEpisodeGroupsResponse, ITVEpisodeGroupsQuery>({
      query: ({ series_id }) => ({
        params: {
          api_key: tmdbAPIKey,
        },
        url: `/tv/${series_id}/episode_groups`
      })
    }),
    getTvExternalIds: builder.query<ITVExternalIdsResponse, ITVExternalIdsQuery>({
      query: ({ series_id }) => ({
        params: {
          api_key: tmdbAPIKey,
        },
        url: `/tv/${series_id}/external_ids`
      })
    }),
    getTvImages: builder.query<ITVImagesResponse, ITVImagesQuery>({
      query: ({ series_id }) => ({
        params: {
          api_key: tmdbAPIKey,
        },
        url: `/tv/${series_id}/images`
      })
    }),
    getTvKeywords: builder.query<ITVKeywordsResponse, ITVKeywordsQuery>({
      query: ({ series_id }) => ({
        params: {
          api_key: tmdbAPIKey,
        },
        url: `/tv/${series_id}/keywords`
      })
    }),
    getTvLatest: builder.query<ITVLatestResponse, void>({
      query: () => ({
        params: {
          api_key: tmdbAPIKey,
        },
        url: `/tv/latest`
      })
    }),
    getTvRecommendations: builder.query<ITVRecommendationsResponse, ITVRecommendationsQuery>({
      query: ({ series_id, params }) => ({
        params: {
          api_key: tmdbAPIKey,
          ...params
        },
        url: `/tv/${series_id}/recommendations`
      })
    }),
    getTvReviews: builder.query<ITVReviewsResponse, ITVReviewsQuery>({
      query: ({ series_id, params }) => ({
        params: {
          api_key: tmdbAPIKey,
          ...params
        },
        url: `/tv/${series_id}/reviews`
      })
    }),
    getTvScreenedTheatrically: builder.query<ITVScreenedTheatricallyResponse, ITVScreenedTheatricallyQuery>({
      query: ({ series_id }) => ({
        params: {
          api_key: tmdbAPIKey,
        },
        url: `/tv/${series_id}/screened_theatrically`
      })
    }),
    getTvSimilar: builder.query<ITVSimilarResponse, ITVSimilarQuery>({
      query: ({ series_id, params }) => ({
        params: {
          api_key: tmdbAPIKey,
          ...params
        },
        url: `/tv/${series_id}/similar`
      })
    }),
    getTvTranslations: builder.query<ITVTranslationsResponse, ITVTranslationsQuery>({
      query: ({ series_id }) => ({
        params: {
          api_key: tmdbAPIKey,
        },
        url: `/tv/${series_id}/translations`
      })
    }),
    getTvVideos: builder.query<ITVVideosResponse, ITVVideosQuery>({
      query: ({ series_id, params }) => ({
        params: {
          api_key: tmdbAPIKey,
          ...params
        },
        url: `/tv/${series_id}/videos`
      })
    }),
    getTvWatchProviders: builder.query<ITVWatchProvidersResponse, ITVWatchProvidersQuery>({
      query: ({ series_id }) => ({
        params: {
          api_key: tmdbAPIKey,
        },
        url: `/tv/${series_id}/watch/providers`
      })
    }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }

    return null;
  },
  reducerPath: 'tvApi'
})

export const {
  useGetTvAggregateCreditsQuery,
  useGetTvAltTitlesQuery,
  useGetTvContentRatingsQuery,
  useGetTvCreditsQuery,
  useGetTvDetailsQuery,
  useGetTvEpisodeGroupsQuery,
  useGetTvExternalIdsQuery,
  useGetTvImagesQuery,
  useGetTvKeywordsQuery,
  useGetTvLatestQuery,
  useGetTvRecommendationsQuery,
  useGetTvReviewsQuery,
  useGetTvScreenedTheatricallyQuery,
  useGetTvSimilarQuery,
  useGetTvTranslationsQuery,
  useGetTvVideosQuery,
  useGetTvWatchProvidersQuery
} = tvApi