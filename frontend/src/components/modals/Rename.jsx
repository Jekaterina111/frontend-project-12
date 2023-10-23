import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import _ from 'lodash';
import { io } from 'socket.io-client';
import {
  Button, Form, Modal,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { actions as modalsAction } from '../../slices/modalsSlice';
import { channelSelectors } from '../../slices/channelSlice';

const socket = io();

const Rename = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClose = () => dispatch(modalsAction.closeModal());
  const channelId = useSelector((state) => state.modals.channelId);
  const channel = useSelector((state) => channelSelectors.selectById(state, channelId));
  const [renameFail, setRenameFail] = useState(false);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const channelsNames = useSelector(channelSelectors.selectAll).map((chann) => chann.name);

  const renameSchema = yup.object().shape({
    body: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      body: channel.name,
    },
    validationSchema: renameSchema,
    onSubmit: async (values) => {
      try {
        const newName = values.body.trim();
        if (_.includes(channelsNames, newName)) {
          setRenameFail(true);
        } else {
          socket.emit('renameChannel', { id: channelId, name: newName });
          toast.success(t('toast_messages.channel_renamed'));
          handleClose();
        }
      } catch (err) {
        toast.error((t('toast_messages.server_lost')));
      }
    },
  });

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.headers.rename')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              ref={inputRef}
              name="body"
              type="text"
              className="mb-2"
              autoFocus
              isInvalid={(formik.errors.name && formik.touched.name)
                || renameFail}
            />
            <Form.Control.Feedback type="invalid">{t('modals.headers.channelAlreadyExists')}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant="secondary me-2" onClick={handleClose}>
                {t('modals.buttons.decline')}
              </Button>
              <Button type="submit" variant="primary">
                {t('modals.buttons.send')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
