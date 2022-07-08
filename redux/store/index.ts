import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { tmrevApi } from '../api';
import rootReducer, { RootState } from '../reducers';

export const store = () => configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmrevApi.middleware),
  reducer: rootReducer,
});

export type AppDispatch = AppStore['dispatch'];
export type AppStore = ReturnType<typeof store>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const wrapper = createWrapper<AppStore>(store, { debug: true });
