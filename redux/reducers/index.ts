import { combineReducers } from 'redux';

import { tmrevApi } from '../api';

const rootReducer = combineReducers({
  [tmrevApi.reducerPath]: tmrevApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
