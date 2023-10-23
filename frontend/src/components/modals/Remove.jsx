import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { actions as modalsAction } from '../../slices/modalsSlice';
import { actions as channelActions } from '../../slices/channelSlice';

const socket = io();

const Remove = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClose = () => dispatch(modalsAction.closeModal());
  const channelId = useSelector((state) => state.modals.channelId);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const notify = () => toast.success(t('toast_messages.channel_deleted'));

  const handleRemove = () => {
    socket.emit('removeChannel', { id: channelId });
    if (channelId === currentChannelId) {
      dispatch(channelActions.setNewId({ id: 1 }));
    }
    notify();
    handleClose();
  };

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.headers.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.body.confirmation')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary me-2" onClick={handleClose}>
            {t('modals.buttons.decline')}
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            {t('modals.buttons.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
