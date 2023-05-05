import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { tmrevApi } from '../api';
import { newsApi } from '../api/news';
import { peopleApi } from '../api/tmdb/peopleAPI';
import { searchApi } from '../api/tmdb/searchAPI';
import rootReducer, { RootState } from '../reducers';

export const store = () => configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(tmrevApi.middleware)
      .concat(peopleApi.middleware)
      .concat(searchApi.middleware)
      .concat(newsApi.middleware),
  reducer: rootReducer,
});

export type AppDispatch = AppStore['dispatch'];
export type AppStore = ReturnType<typeof store>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const wrapper = createWrapper<AppStore>(store, { debug: true });
