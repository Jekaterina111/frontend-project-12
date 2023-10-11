import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { Row, Container, Col } from 'react-bootstrap';
import { fetchChatData, actions as channelActions } from '../slices/channelSlice';
import { actions as messageActios } from '../slices/messageSlice';
import Channelslist from '../components/channels/ChannelsList';
import ChannelInfo from '../components/channels/ChannelInfo';

const socket = io();

const PrivatePage = () => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  useEffect(() => {
    dispatch(fetchChatData());
  }, [dispatch]);

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(messageActios.addMessage(payload));
    });
  }, [dispatch]);

  useEffect(() => {
    socket.on('newChannel', (payload) => {
      dispatch(channelActions.addChannel(payload));
    });
  }, [dispatch]);

  useEffect(() => {
    socket.on('renameChannel', (payload) => {
      const channelId = payload.id;
      const newName = payload.name;
      dispatch(channelActions.renameChannel({ id: channelId, changes: { name: newName } }));
    });
  }, [dispatch]);

  useEffect(() => {
    socket.on('removeChannel', (payload) => {
      dispatch(channelActions.removeChannel(payload.id));
      if (payload.id === currentChannelId) {
        dispatch(channelActions.setNewId({ id: 1 }));
      }
    });
  }, [currentChannelId, dispatch]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded-2 shadow">
      <Row className="h-100 d-flex flex-md-row bg-white">
        <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
          <Channelslist />
        </Col>
        <Col xs className="h-100 p-0">
          <ChannelInfo />
        </Col>
      </Row>
    </Container>
  );
};

export default PrivatePage;
