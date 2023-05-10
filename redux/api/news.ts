import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { GatherNewsResponse, NewsQuery, NewsResponse, NewsSearchResponse, TrendingNewsQuery, TrendingNewsResponse } from '@/models/tmrev/news';

export const newsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8081',
    prepareHeaders: (headers) => {
      headers.set('sources', 'ULTRA_SOURCES')
      headers.set('sentiment', 'false')

      return headers
    }
  }),
  endpoints: (builder) => ({
    gatherNews: builder.query<GatherNewsResponse, NewsQuery>({
      query: ({ ...params }) => ({
        params: {
          ...params
        },
        url: '/news/gather'
      })
    }),
    getNews: builder.query<NewsResponse, void>({
      query: () => ({
        url: '/news'
      })
    }),
    searchNews: builder.query<NewsSearchResponse, NewsQuery>({
      query: ({ ...params }) => ({
        params: {
          ...params
        },
        url: '/news/advanced/search'
      })
    }),
    trending: builder.query<TrendingNewsResponse, TrendingNewsQuery>({
      query: ({ ...params }) => ({
        params: {
          ...params
        },
        url: '/news/trending'
      })
    })
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }

    return null;
  },
  reducerPath: 'newsApi'
})

export const {
  useGetNewsQuery,
  useSearchNewsQuery,
  useGatherNewsQuery,
  useTrendingQuery,
  util: { getRunningOperationPromise }
} = newsApi

export const {
  getNews,
  searchNews
} = newsApi.endpoints