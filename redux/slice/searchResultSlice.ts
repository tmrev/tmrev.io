import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MovieGeneral } from '@/models/tmdb/movie/tmdbMovie';
import { uniqueArray } from '@/utils/common';

export type ScrollPosition = {
  x: number,
  y: number
}

interface InitialState {
  data: MovieGeneral[]
  page: number
  scrollPosition: ScrollPosition
}

const initialState: InitialState = {
  data: [],
  page: 1,
  scrollPosition: {
    x: 0,
    y: 0
  },
};

const searchResultSlice = createSlice({
  initialState,
  name: 'searchResult',
  reducers: {
    addData: (state: InitialState, action: PayloadAction<MovieGeneral[]>) => {
      const newArr = uniqueArray([...state.data, ...action.payload], 'id')

      state.data = newArr
    },
    incrementPage: (state: InitialState) => {
      state.page += 1
    },
    setScrollPosition: (state: InitialState, action: PayloadAction<ScrollPosition>) => {
      const newPos: ScrollPosition = JSON.parse(JSON.stringify(action.payload))
      state.scrollPosition = {
        x: newPos.x,
        y: newPos.y
      }
    }
  },
});

export const {
  addData,
  incrementPage,
  setScrollPosition
} = searchResultSlice.actions;

export default searchResultSlice.reducer;
