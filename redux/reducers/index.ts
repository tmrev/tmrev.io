import { combineReducers } from 'redux';

import { tmdbApi } from '../api/tmdbAPI';

const rootReducer = combineReducers({
  [tmdbApi.reducerPath]: tmdbApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
