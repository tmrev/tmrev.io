import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../reducers';

interface InitialState {
  navigationOpen: boolean
}

const initialState: InitialState = { navigationOpen: false };

const navigationSlice = createSlice({
  initialState,
  name: 'navigation',
  reducers: {
    setOpenNavigation: (state: InitialState, action: PayloadAction<boolean>) => {
      state.navigationOpen = action.payload;
    },
  },
});

export const { setOpenNavigation } = navigationSlice.actions;

export const isNavigationOpen = (state: RootState) => state.navigation.navigationOpen;

export default navigationSlice.reducer;
