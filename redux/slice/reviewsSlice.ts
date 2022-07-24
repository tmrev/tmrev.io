import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CreateTmrevReviewQuery } from '../../models/tmrev';

interface InitialState {
  reviews: Record<number, CreateTmrevReviewQuery>
  currentReview: CreateTmrevReviewQuery | null
}

const initialState: InitialState = {
  currentReview: null,
  reviews: [],
};

const reviewsSlice = createSlice({
  initialState,
  name: 'reviews',
  reducers: {
    setAddReview: (state: InitialState, action: PayloadAction<CreateTmrevReviewQuery>) => {
      const copy = structuredClone(state.reviews);

      const key = action.payload.tmdbID;

      copy[key] = action.payload;

      state.reviews = copy;
    },
    setClearCurrentReview: (state:InitialState) => {
      state.currentReview = null;
    },
    setClearReviews: (state: InitialState) => {
      state.reviews = initialState.reviews;
      state.currentReview = null;
    },
    setCurrentReview: (state: InitialState, action: PayloadAction<CreateTmrevReviewQuery>) => {
      const review = {
        ...state.currentReview,
        ...action.payload,
      };

      state.currentReview = review;
    },
    setRemoveReview: (state: InitialState, action: PayloadAction<number>) => {
      const copy = structuredClone(state.reviews);

      delete copy[action.payload];

      state.reviews = copy;
    },
  },
});

export const {
  setAddReview, setClearReviews, setRemoveReview, setClearCurrentReview, setCurrentReview,
} = reviewsSlice.actions;

export default reviewsSlice.reducer;
