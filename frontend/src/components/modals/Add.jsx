import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { useFormik } from 'formik';
import { io } from 'socket.io-client';
import * as Yup from 'yup';
import { channelSelectors, actions as channelActions } from '../../slices/channelSlice';
import { actions as modalsActions } from '../../slices/modalsSlice';

const socket = io();

const Add = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClose = () => dispatch(modalsActions.closeModal());
  const [submitAdd, setSubmitAdd] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const channelNames = useSelector(channelSelectors.selectAll).map((channel) => channel.name);

  const channelSchema = Yup.object().shape({
    channel: Yup.string()
      .min(3, t('validation_errors.wrong_length'))
      .max(20, t('validation_errors.wrong_length'))
      .required(t('validation_errors.is_required'))
      .notOneOf(
        channelNames,
        t('modals.headers.channelAlreadyExists'),
      ),
  });
  const formik = useFormik({
    initialValues: {
      channel: '',
    },
    validationSchema: channelSchema,
    onSubmit: async (values) => {
      try {
        const newChannel = values.channel.trim();
        if (_.includes(channelNames, newChannel)) {
          setSubmitAdd(true);
        } else {
          socket.emit(
            'newChannel',
            { name: newChannel },
            async ({ data }) => {
              await dispatch(channelActions.setNewId({ id: data.id }));
              toast.success(t('toast_messages.channel_added'));
              handleClose();
            },
          );
        }
      } catch (err) {
        toast.error((t('toast_messages.server_lost')));
      }
    },
  });

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('modals.headers.add')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              isInvalid={!!formik.errors.channel || submitAdd}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.channel}
              id="channel"
              name="channel"
              ref={inputRef}
            />
            <Form.Label htmlFor="name" className="visually-hidden">
              {t('modals.body.channel_name_label')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.channel)}
            </Form.Control.Feedback>
            <div className="mt-3 d-flex justify-content-end">
              <Button className="me-2" variant="secondary" onClick={handleClose}>
                {t('modals.buttons.decline')}
              </Button>
              <Button variant="primary" type="submit">
                {t('modals.buttons.send')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
