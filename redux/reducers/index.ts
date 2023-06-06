import { combineReducers } from 'redux';

import { tmrevApi } from '../api';
import { newsApi } from '../api/news';
import { movieApi } from '../api/tmdb/movieAPI';
import { peopleApi } from '../api/tmdb/peopleAPI';
import { searchApi } from '../api/tmdb/searchAPI';
import { tvApi } from '../api/tmdb/tvAPI';
import modalSlice from '../slice/modalSlice';
import navigationSlice from '../slice/navigationSlice';
import reviewsSlice from '../slice/reviewsSlice';
import searchResultSlice from '../slice/searchResultSlice';
import toastSlice from '../slice/toastSlice';
import userProfileSlice from '../slice/userProfileSlice';
import watchListSlice from '../slice/watchListSlice';

const rootReducer = combineReducers({
  [tmrevApi.reducerPath]: tmrevApi.reducer,
  [peopleApi.reducerPath]: peopleApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [movieApi.reducerPath]: movieApi.reducer,
  [tvApi.reducerPath]: tvApi.reducer,
  modal: modalSlice,
  navigation: navigationSlice,
  reviews: reviewsSlice,
  searchResult: searchResultSlice,
  toast: toastSlice,
  userProfile: userProfileSlice,
  watchList: watchListSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
