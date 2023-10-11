import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../slices/channelSlice';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const handleClick = () => dispatch(actions.setNewId({ id: channel.id }));

  return (
    <Nav.Item as="li">
      <Nav.Link as={Button} variant={currentChannelId === channel.id ? 'secondary' : ''} onClick={handleClick} className="text-start rounded-0">
        <span>#</span>
        {channel.name}
      </Nav.Link>
    </Nav.Item>
  );
};

export default Channel;
