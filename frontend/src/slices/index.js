import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelSlice.js';
import messagesReducer from './messageSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
