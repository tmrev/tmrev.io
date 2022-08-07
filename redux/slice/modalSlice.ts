import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import React from 'react';

import { ButtonVariant } from '../../components/common/Button';
import { RootState } from '../reducers';

export interface Content {
  title: string;
  description: string
  outsideClick: boolean
  closeFunc: Function
  children?: React.ReactNode
  buttons?: Button[]
  renderWithDefaultBody?: boolean
}

type Button = {
  variant: ButtonVariant
  hoverEffect?: boolean
  title: string;
  // eslint-disable-next-line no-unused-vars
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: 'submit' | 'reset' | 'button'
}

interface InitialState {
  isOpen: boolean
  content: Content | null
}

const initialState: InitialState = {
  content: null,
  isOpen: false,
};

const modalSlice = createSlice({
  initialState,
  name: 'globalModal',
  reducers: {
    setClearModal: (state: InitialState) => {
      state.content = initialState.content;
      state.isOpen = initialState.isOpen;
    },
    setModalContent: (state: InitialState, action: PayloadAction<Content>) => {
      state.content = action.payload;
    },
    setOpenModal: (state: InitialState, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const isModalOpen = (state: RootState) => state.modal.isOpen;
export const modalContent = (state: RootState) => state.modal.content;

export const { setClearModal, setModalContent, setOpenModal } = modalSlice.actions;

export default modalSlice.reducer;
