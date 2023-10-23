import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modalsInfo',
  initialState: {
    isOpen: false,
    type: null,
    channelId: null,
  },
  reducers: {
    openModal(state, { payload }) {
      return {
        ...state,
        isOpen: true,
        type: payload.type,
        channelId: payload.channelId,
      };
    },
    closeModal(state) {
      return {
        ...state,
        isOpen: false,
        type: null,
      };
    },
  },
});

export const { actions } = modalsSlice;
export default modalsSlice.reducer;
