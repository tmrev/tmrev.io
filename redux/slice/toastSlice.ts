import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  toastOpen: boolean
  toastContent: string
}

const initialState: InitialState = {
  toastContent: '',
  toastOpen: false,
};

const toastSlice = createSlice({
  initialState,
  name: 'Toast',
  reducers: {
    setOpenToast: (state, action: PayloadAction<boolean>) => {
      state.toastOpen = action.payload;
    },
    setToastContent: (state, action: PayloadAction<string>) => {
      state.toastContent = action.payload;
    },
  },
});

export const { setOpenToast, setToastContent } = toastSlice.actions;

export default toastSlice.reducer;
