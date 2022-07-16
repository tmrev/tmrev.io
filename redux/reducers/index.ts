import { combineReducers } from 'redux';

import { tmrevApi } from '../api';
import navigationSlice from '../slice/navigationSlice';

const rootReducer = combineReducers({
  [tmrevApi.reducerPath]: tmrevApi.reducer,
  navigation: navigationSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
