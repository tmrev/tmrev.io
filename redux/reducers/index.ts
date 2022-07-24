import { combineReducers } from 'redux';

import { tmrevApi } from '../api';
import modalSlice from '../slice/modalSlice';
import navigationSlice from '../slice/navigationSlice';
import reviewsSlice from '../slice/reviewsSlice';

const rootReducer = combineReducers({
  [tmrevApi.reducerPath]: tmrevApi.reducer,
  modal: modalSlice,
  navigation: navigationSlice,
  reviews: reviewsSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
