import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { GatherNewsResponse, NewsQuery, NewsResponse, NewsSearchResponse } from '@/models/tmrev/news';

export const newsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://news.tmrev.io',
    prepareHeaders: (headers) => headers
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
        url: '/news/search'
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
  util: { getRunningOperationPromise }
} = newsApi

export const {
  getNews,
  searchNews
} = newsApi.endpoints