import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import {
  Row, Container, Col, Button, Nav,
} from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { fetchChatData, channelSelectors, actions as channelActions } from '../slices/channelSlice';
import { actions as messageActios } from '../slices/messageSlice';
import { actions as modalsActions } from '../slices/modalsSlice';
import ChannelInfo from '../components/channels/ChannelInfo';
import Channel from '../components/channels/Channel';
import getModal from '../components/modals/index.js';

const socket = io();

const renderModal = (type) => {
  if (type === null) {
    return null;
  }

  const Modal = getModal(type);
  return <Modal />;
};

const PrivatePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const addModal = () => dispatch(modalsActions.openModal({ type: 'adding', channelId: null }));

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

  const modalType = useSelector((state) => state.modals.type);
  const channels = useSelector(channelSelectors.selectAll);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded-2 shadow">
      <Row className="h-100 flex-md-row bg-white">
        <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex d-block">
          <div className="d-flex mt-1 justify-content-between m-b-2 ps-4 p-4 align-items-center">
            <span>{t('chat.channels')}</span>
            <Button variant="group-vertical " className="text-primary ms-auto" onClick={addModal}>
              <PlusSquare color="royalblue" size={20} />
              <span className="visually-hidden">+</span>
            </Button>
          </div>
          <Nav as="ul" justify variant="pills" className="flex-column px-2 h-100">
            {channels.map((channel) => <Channel key={channel.id} channel={channel} />)}
          </Nav>
        </Col>
        <ChannelInfo />
      </Row>
      {renderModal(modalType)}
    </Container>
  );
};

export default PrivatePage;
