import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import {
  PeopleQuery,
  PersonCombineCredit,
  PersonDetail,
  PersonExternalIds,
  PersonImages,
  PersonMovieCredit,
  PersonQuery,
  PersonTaggedImages,
  PersonTranslations,
  PersonTVCredit,
  PopularPeople
} from '@/models/tmdb/person';

export const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const peopleApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
    prepareHeaders: (headers) => headers
  }),
  endpoints: (builder) => ({
    getLatestPeople: builder.query({
      query: () => ({
        params: {
          api_key: apiKey
        },
        url: `/person/latest`
      })
    }),
    getPerson: builder.query<PersonDetail, PersonQuery>({
      query: ({ personId, ...params }) => ({
        params: {
          api_key: apiKey,
          ...params
        },
        url: `/person/${personId}`
      })
    }),
    getPersonCredits: builder.query<PersonCombineCredit, PersonQuery>({
      query: ({ personId, ...params }) => ({
        params: {
          api_key: apiKey,
          ...params
        },
        url: `/person/${personId}/combined_credits`
      })
    }),
    getPersonExternalIds: builder.query<PersonExternalIds, PersonQuery>({
      query: ({ personId, ...params }) => ({
        params: {
          api_key: apiKey,
          ...params
        },
        url: `/person/${personId}/external_ids`
      })
    }),
    getPersonImages: builder.query<PersonImages, PersonQuery>({
      query: ({ personId, ...params }) => ({
        params: {
          api_key: apiKey,
          ...params
        },
        url: `/person/${personId}/images`
      })
    }),
    getPersonMostPopularMovies: builder.query({
      query: ({ personId, ...params }) => ({
        params: {
          api_key: apiKey,
          ...params
        },
        url: `/person/${personId}/movie_credits`
      }),
      transformResponse: (response: PersonMovieCredit) => response.cast.sort((a, b) => b.popularity - a.popularity)
    }),
    getPersonMovieCredits: builder.query<PersonMovieCredit, PersonQuery>({
      query: ({ personId, ...params }) => ({
        params: {
          api_key: apiKey,
          ...params
        },
        url: `/person/${personId}/movie_credits`
      })
    }),
    getPersonTVCredits: builder.query<PersonTVCredit, PersonQuery>({
      query: ({ personId, ...params }) => ({
        params: {
          api_key: apiKey,
          ...params
        },
        url: `/person/${personId}/tv_credits`
      })
    }),
    getPersonTaggedImages: builder.query<PersonTaggedImages, PersonQuery>({
      query: ({ personId, ...params }) => ({
        params: {
          api_key: apiKey,
          ...params
        },
        url: `/person/${personId}/tagged_images`
      }),
    }),
    getPersonTranslations: builder.query<PersonTranslations, PersonQuery>({
      query: ({ personId, ...params }) => ({
        params: {
          api_key: apiKey,
          ...params
        },
        url: `/person/${personId}/translations`
      })
    }),
    getPopularPeople: builder.query<PopularPeople, PeopleQuery>({
      query: ({ ...params }) => ({
        params: {
          api_key: apiKey,
          ...params
        },
        url: `/person/popular`
      })
    })
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }

    return null;
  },
  reducerPath: 'peopleApi'
})


export const {
  useGetPersonQuery,
  useGetLatestPeopleQuery,
  useGetPersonCreditsQuery,
  useGetPersonExternalIdsQuery,
  useGetPersonImagesQuery,
  useGetPersonMovieCreditsQuery,
  useGetPersonTVCreditsQuery,
  useGetPersonTaggedImagesQuery,
  useGetPersonTranslationsQuery,
  useGetPopularPeopleQuery,
  useGetPersonMostPopularMoviesQuery,
  util: { getRunningOperationPromises },
} = peopleApi

export const {
  getPerson,
  getLatestPeople,
  getPersonCredits,
  getPersonExternalIds,
  getPersonImages,
  getPersonMovieCredits,
  getPersonTVCredits,
  getPersonTaggedImages,
  getPersonTranslations,
  getPopularPeople
} = peopleApi.endpoints