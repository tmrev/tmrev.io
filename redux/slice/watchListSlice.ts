import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Movie } from '../../models/tmdb';
import { WatchList } from '../../models/tmrev';

interface InitialState {
  watchList: WatchList | null
  movies: Record<string, Movie> | null
}

const initialState: InitialState = {
  movies: null,
  watchList: null,
};

const watchListSlice = createSlice({
  initialState,
  name: 'watchList',
  reducers: {
    setMovies: (state: InitialState, action: PayloadAction<Record<string, Movie>>) => {
      state.movies = action.payload;
    },
    setWatchList: (state: InitialState, action: PayloadAction<WatchList>) => {
      state.watchList = action.payload;
    },
  },
});

export const { setWatchList, setMovies } = watchListSlice.actions;

export default watchListSlice.reducer;
