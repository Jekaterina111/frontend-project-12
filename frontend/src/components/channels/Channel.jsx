import React from 'react';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { actions as channelActions } from '../../slices/channelSlice';
import { actions as modalsActions } from '../../slices/modalsSlice';

const filter = require('leo-profanity');

filter.add(filter.getDictionary('ru'));
filter.add(filter.getDictionary('en'));

const Channel = ({ channel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const handleClick = () => dispatch(channelActions.setNewId({ id: channel.id }));
  const removeModal = () => dispatch(modalsActions.openModal({ type: 'removing', channelId: channel.id }));
  const renameModal = () => dispatch(modalsActions.openModal({ type: 'renaming', channelId: channel.id }));

  const variant = currentChannelId === channel.id ? 'secondary' : '';
  return (
    channel.removable
      ? (
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            variant={variant}
            className="w-100 text-start rounded-0 text-truncate"
            onClick={handleClick}
          >
            <span className="me-1">#</span>
            {filter.clean(channel.name)}
          </Button>
          <Dropdown.Toggle split variant={variant} id="dropdown-split-basic" className="flex-grow-0">
            <span className="visually-hidden">{t('modals.buttons.controle_channel')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={removeModal}>{t('modals.buttons.remove')}</Dropdown.Item>
            <Dropdown.Item onClick={renameModal}>{t('modals.buttons.rename')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )
      : (
        <Button
          variant={variant}
          className="w-100 text-start rounded-0"
          onClick={handleClick}
        >
          <span className="me-1">#</span>
          {filter.clean(channel.name)}
        </Button>
      )
  );
};

export default Channel;
