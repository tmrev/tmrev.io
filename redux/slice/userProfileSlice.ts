import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TmrevReview, User, WatchList } from '../../models/tmrev';
import { Profile } from '../../models/tmrev/movie';

interface Data extends User {
  isUser: boolean
}

interface InitialState {
  reviews: TmrevReview[]
  watchLists: WatchList[]
  sortedReviews: {
    highest: TmrevReview[],
    lowest: TmrevReview[],
  }
  profile: Profile | null
}

const initialState: InitialState = {
  profile: null,
  reviews: [],
  sortedReviews: {
    highest: [],
    lowest: [],
  },
  watchLists: [],
};

const userProfileSlice = createSlice({
  initialState,
  name: 'userProfile',
  reducers: {
    clearUserData: (state) => {
      state.reviews = initialState.reviews;
      state.watchLists = initialState.watchLists;
      state.sortedReviews = initialState.sortedReviews;
    },
    setUserData: (state, action: PayloadAction<Data>) => {
      const {
        watchLists, isUser, reviews, firstName,
        lastName, following,
        uuid, photoUrl, backdropPath, email,
        _id,
      } = action.payload;

      const getWatchList = () => [...watchLists.filter((value) => {
        if (isUser) {
          return value;
        }

        return value.public === true;
      })];

      const getReviews = () => [...reviews.filter((value) => {
        if (isUser) {
          return value;
        }

        return value.public === true;
      })];

      const getSortedRatedMovies = () => {
        // eslint-disable-next-line max-len
        const sortedReviews = [...reviews].sort((a, b) => (a.averagedAdvancedScore || 0) - (b.averagedAdvancedScore || 0));

        return {
          highestRated: sortedReviews.slice(-10).reverse(),
          lowestRated: sortedReviews.slice(0, 10),
        };
      };

      state.reviews = getReviews();
      state.watchLists = getWatchList();
      state.sortedReviews = {
        highest: getSortedRatedMovies().highestRated,
        lowest: getSortedRatedMovies().lowestRated,
      };
      state.profile = {
        _id,
        backdropPath,
        email,
        firstName,
        following,
        lastName,
        photoUrl,
        uuid,
      };
    },
  },
});

export const { setUserData, clearUserData } = userProfileSlice.actions;

export default userProfileSlice.reducer;
