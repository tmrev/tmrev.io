import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { tmdbApi } from '../api/tmdbAPI';
import rootReducer, { RootState } from '../reducers';

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
