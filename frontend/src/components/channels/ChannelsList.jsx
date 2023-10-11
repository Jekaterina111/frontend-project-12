import React from 'react';
import { useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { channelSelectors } from '../../slices/channelSlice';
import Channel from './Channel';

const ChannelsList = () => {
  const channels = useSelector(channelSelectors.selectAll);
  const { t } = useTranslation();

  return (
    <>
      <div className="d-flex flex-row justify-content-between ps-4 pe-2">
        <span>{t('chat.channels')}</span>
        <button type="button" className="btn btn-group-vertical text-primary p-0">
          <PlusSquare color="royalblue" size={20} />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <Nav as="ul" justify variant="pills" className="flex-column p-2">
        {channels.map((channel) => <Channel key={channel.id} channel={channel} />)}
      </Nav>
    </>
  );
};

export default ChannelsList;
