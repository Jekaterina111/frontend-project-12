import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchChatData, actions as chatActions } from './channelSlice';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatData.fulfilled, (state, { payload }) => {
        messagesAdapter.upsertMany(state, payload.messages);
      })
      .addCase(chatActions.removeChannel, (state, { payload }) => {
        const channelId = payload;
        const restEntities = Object.values(state.entities)
          .filter((msg) => msg.channelId !== channelId);
        messagesAdapter.setAll(state, restEntities);
      });
  },
});

export const { actions } = messagesSlice;
export const messageSelectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
