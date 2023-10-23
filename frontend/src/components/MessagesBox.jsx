import React, { useRef, useEffect } from 'react';
import * as yup from 'yup';
import {
  Form, InputGroup, Button, FormControl,
} from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';

const getMessage = (message, channelId) => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const { username } = user;
  return { body: message, channelId, username };
};

const socket = io();

const MessagesBox = ({ channelId }) => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: yup.object({
      message: yup.string().trim().min(1).required(),
    }),
    onSubmit: (values) => {
      try {
        const newMessage = getMessage(values.message, channelId);
        socket.emit('newMessage', newMessage);
        formik.resetForm();
      } catch (err) {
        toast.error((t('toast_messages.server_lost')));
      }
      formik.setSubmitting(false);
      inputRef.current.focus();
    },
    validateOnBlur: false,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <InputGroup hasValidation>
          <FormControl
            id="message"
            name="message"
            className="p-0 ps-2 border-0"
            placeholder={t('placeholders.type_message')}
            aria-label={t('chat.new_message')}
            aria-describedby="submit-Btn"
            onChange={formik.handleChange}
            ref={inputRef}
            value={formik.values.message}
          />
          <Button type="submit" variant="group-vertical" disabled={!formik.values.message}>
            <ArrowRightSquare size={20} />
            <span className="visually-hidden">{t('buttons.send')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessagesBox;
