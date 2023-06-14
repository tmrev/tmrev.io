import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { tmdbAPIKey, tmdbBaseUrl } from '@/constants';
import { DiscoverMovieQuery, IDiscoverMovieResponse } from '@/models/tmdb/discover';
import {
  IBaseSearchQuery,
  IFindCollectionResponse,
  IFindCompanyResponse,
  IFindKeywordsResponse,
  IFindMoviesResponse,
  IFindMultiResponse,
  IFindPeopleResponse,
  IFindTvResponse
} from '@/models/tmdb/search';

export const searchApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${tmdbBaseUrl}search`,
    prepareHeaders: (headers) => headers
  }),
  endpoints: (builder) => ({
    findCollection: builder.query<IFindCollectionResponse, IBaseSearchQuery>({
      query: (data) => ({
        params: {
          api_key: tmdbAPIKey,
          ...data
        },
        url: '/collection'
      })
    }),
    findCompanies: builder.query<IFindCompanyResponse, IBaseSearchQuery>({
      query: (data) => ({
        params: {
          api_key: tmdbAPIKey,
          ...data
        },
        url: '/company'
      })
    }),
    findKeywords: builder.query<IFindKeywordsResponse, IBaseSearchQuery>({
      query: (data) => ({
        params: {
          api_key: tmdbAPIKey,
          ...data
        },
        url: '/keyword'
      })
    }),
    findMovieYear: builder.query<IDiscoverMovieResponse, DiscoverMovieQuery>({
      query: (data) => ({
        params: {
          api_key: tmdbAPIKey,
          ...data
        },
        url: `${tmdbBaseUrl}/discover/movie`
      })
    }),
    findMovies: builder.query<IFindMoviesResponse, IBaseSearchQuery>({
      query: (data) => ({
        params: {
          api_key: tmdbAPIKey,
          ...data
        },
        url: '/movie'
      })
    }),
    findMulti: builder.query<IFindMultiResponse, IBaseSearchQuery>({
      query: (data) => ({
        params: {
          api_key: tmdbAPIKey,
          ...data
        },
        url: '/multi'
      })
    }),
    findPeople: builder.query<IFindPeopleResponse, IBaseSearchQuery>({
      query: (data) => ({
        params: {
          api_key: tmdbAPIKey,
          ...data
        },
        url: '/person'
      }),
      transformResponse: (response: IFindPeopleResponse) => {

        const newResults = [...response.results]

        newResults.sort((a, b) => b.popularity - a.popularity)

        return {
          ...response,
          results: newResults
        }
      }
    }),
    findTv: builder.query<IFindTvResponse, IBaseSearchQuery>({
      query: (data) => ({
        params: {
          api_key: tmdbAPIKey,
          ...data
        },
        url: '/tv'
      })
    })
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }

    return null;
  },
  reducerPath: 'searchApi'
})



export const {
  useFindCollectionQuery,
  useFindCompaniesQuery,
  useFindKeywordsQuery,
  useFindMoviesQuery,
  useFindMultiQuery,
  useFindPeopleQuery,
  useFindTvQuery,
  useFindMovieYearQuery,
  util: { getRunningQueriesThunk }
} = searchApi

export const {
  findCollection,
  findCompanies,
  findKeywords,
  findMovies,
  findMulti,
  findPeople,
  findTv,
  findMovieYear
} = searchApi.endpoints