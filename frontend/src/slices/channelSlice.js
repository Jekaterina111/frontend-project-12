/* eslint-disable no-param-reassign */

import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }

  return {};
};

export const fetchChatData = createAsyncThunk(
  'chatInfo/fetchData',
  async () => {
    const { data } = await axios.get(routes.dataPath(), {
      headers: getAuthHeader(),
    });
    return data;
  },
);

const channelsAdapter = createEntityAdapter();

const channelSlice = createSlice({
  name: 'channelsInfo',
  initialState: channelsAdapter.getInitialState({
    currentChannelId: 0,
  }),
  reducers: {
    setNewId(state, { payload }) {
      return {
        ...state,
        currentChannelId: payload.id,
      };
    },
    addChannel: channelsAdapter.addOne,
    renameChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChatData.fulfilled, (state, { payload }) => {
      const { channels, currentChannelId } = payload;
      channelsAdapter.upsertMany(state, channels);
      state.currentChannelId = currentChannelId;
    });
  },
});

export const { actions } = channelSlice;
export const channelSelectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelSlice.reducer;
