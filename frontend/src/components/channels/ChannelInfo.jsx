import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { channelSelectors } from '../../slices/channelSlice';
import { messageSelectors } from '../../slices/messageSlice';
import MessagesBox from '../MessagesBox';

const ChannelInfo = () => {
  const { t } = useTranslation();
  const { currentChannel, channelMessages } = useSelector((state) => {
    const { currentChannelId } = state.channels;
    const channel = channelSelectors.selectById(state, currentChannelId);
    const allMessages = messageSelectors.selectAll(state);
    const messages = allMessages.filter((sms) => sms.channelId === currentChannelId);
    if (!messages) {
      return null;
    }
    return { currentChannel: channel, channelMessages: messages };
  });

  return (
    <div className="small p-3 bg-light shadow-sm">
      <p className="m-0">
        <span className="fw-bold">#</span>
        <span className="fw-bold">
          {currentChannel && currentChannel.name}
        </span>
      </p>
      <span className="text-muted">
        {t('chat.number_of_messages', { count: channelMessages.length })}
      </span>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {channelMessages.map((sms) => (
          <div key={sms.id} className="text-break mb-2">
            <b>{sms.username}</b>
            {`: ${sms.body}`}
          </div>
        ))}
      </div>
      {currentChannel && <MessagesBox channelId={currentChannel.id} />}
    </div>
  );
};

export default ChannelInfo;
