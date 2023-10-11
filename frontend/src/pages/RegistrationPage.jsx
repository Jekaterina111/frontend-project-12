import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import {
  Button, Form, Card, Container, Row, Col,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const RegistrationPage = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const [registFailed, setRegistrationFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const registrSchema = yup.object().shape({
    username: yup.string()
      .trim()
      .min(3, t('validation_errors.wrong_length'))
      .max(20, t('validation_errors.wrong_length'))
      .required(t('validation_errors.is_required')),
    password: yup.string()
      .trim()
      .min(6, t('validation_errors.too_short'))
      .required(t('validation_errors.is_required')),
    confirmation: yup.string()
      .oneOf([yup.ref('password')], t('validation_errors.passwords_must_match'))
      .required(t('validation_errors.is_required')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmation: '',
    },
    validationSchema: registrSchema,
    onSubmit: async (values) => {
      setRegistrationFailed(false);

      try {
        const res = await axios.post(routes.signUpPath(), {
          username: values.username,
          password: values.password,
        });
        localStorage.setItem('userInfo', JSON.stringify(res.data));
        auth.logIn(res.data);
        toast.success(t('toast_messages.success'));
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        console.error(err.message);
        if (err.isAxiosError && err.response.status === 409) {
          setRegistrationFailed(true);
          inputRef.current.select();
        } if (err.message === 'Network Error') {
          toast.error(t('errors.network'));
        }
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <ToastContainer />
      <Row className="h-100 justify-content-center align-content-center">
        <Col md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <Row className="p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src="./images/7495.jpg" className="rounded-circle" alt="chatPickcher" />
                </div>
                <Col>
                  <Form onSubmit={formik.handleSubmit}>
                    <fieldset>
                      <Form.Group>
                        <h1 className="text-center mb-4">{t('authorization.login')}</h1>
                        <Form.Label htmlFor="username">{t('placeholders.username_ph')}</Form.Label>
                        <Form.Control
                          name="username"
                          placeholder={t('placeholders.username_ph')}
                          id="username"
                          autoComplete="username"
                          value={formik.values.username}
                          onChange={formik.handleChange}
                          isInvalid={registFailed}
                          required
                          ref={inputRef}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {formik.errors.username}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mt-3">
                        <Form.Label htmlFor="password">{t('placeholders.password_ph')}</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder={t('placeholders.password_ph')}
                          id="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          autoComplete="current-password"
                          isInvalid={registFailed}
                          required
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {formik.errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mt-3">
                        <Form.Label htmlFor="confirmation">{t('placeholders.password_сonfirmation_ph')}</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmation"
                          placeholder={t('placeholders.password_сonfirmation_ph')}
                          id="confirmation"
                          value={formik.values.confirmation}
                          onChange={formik.handleChange}
                          autoComplete="confirmation"
                          isInvalid={registFailed}
                          required
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {formik.errors.passwordConfirm}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Button type="submit" className="w-100 mb-3 mt-3" variant="outline-primary">
                        {t('authorization.signup_btn')}
                      </Button>
                    </fieldset>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationPage;
