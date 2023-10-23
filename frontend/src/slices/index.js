import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelSlice.js';
import messagesReducer from './messageSlice.js';
import modalsReducer from './modalsSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalsReducer,
  },
});
