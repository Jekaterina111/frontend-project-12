import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { channelSelectors } from '../../slices/channelSlice';
import { messageSelectors } from '../../slices/messageSlice';
import MessagesBox from '../MessagesBox';

filter.add(filter.getDictionary('ru'));
filter.add(filter.getDictionary('en'));

const ChannelInfo = () => {
  const { t } = useTranslation();
  const meassageRef = useRef(null);

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

  useEffect(() => {
    meassageRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const messageList = channelMessages.map((message) => (
    <div className="text-break mb-2" key={message.id}>
      <b>{`${message.username}: `}</b>
      {filter.clean(message.body)}
    </div>
  ));

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <span className="fw-bold">#</span>
            <span className="fw-bold">
              {currentChannel && filter.clean(currentChannel.name)}
            </span>
          </p>
          <span className="text-muted">
            {t('chat.number_of_messages', { count: channelMessages.length })}
          </span>
        </div>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5" ref={meassageRef}>
        <div className="text-break mt-auto px-5 py-3">{messageList}</div>
      </div>
      {currentChannel && <MessagesBox channelId={currentChannel.id} />}
    </div>
  );
};

export default ChannelInfo;
