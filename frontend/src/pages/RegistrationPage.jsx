import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import {
  Button, Form, Card, Container, Row, Col,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  const registrSchema = Yup.object().shape({
    username: Yup.string()
      .trim()
      .min(3, t('validation_errors.wrong_length'))
      .max(20, t('validation_errors.wrong_length'))
      .required(t('validation_errors.is_required')),
    password: Yup.string()
      .trim()
      .min(6, t('validation_errors.too_short'))
      .required(t('validation_errors.is_required')),
    confirmation: Yup.string()
      .oneOf([Yup.ref('password')], t('validation_errors.passwords_must_match'))
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
      try {
        setRegistrationFailed(false);
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
          toast.error(t('toast_messages.server_lost'));
        }
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <h1 className="text-center mt-5 mb-4">{t('chat.greeting')}</h1>
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
                    <h1 className="text-center mb-3">{t('authorization.login')}</h1>
                    <Form.Group className="mb-3">
                      <Form.Control
                        id="username"
                        type="text"
                        name="username"
                        placeholder={t('placeholders.username_ph')}
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        autoComplete="username"
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                        isInvalid={
                          (formik.errors.username && formik.touched.username)
                          || registFailed
                        }
                        required
                        ref={inputRef}
                      />
                      <Form.Label htmlFor="username">{t('placeholders.username_ph')}</Form.Label>
                      <Form.Control.Feedback type="invalid" tooltip placement="right">
                        {t(formik.errors.username)}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mt-4">
                      <Form.Control
                        id="password"
                        type="password"
                        name="password"
                        placeholder={t('placeholders.password_ph')}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        autoComplete="new-password"
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                        isInvalid={
                          (formik.errors.password && formik.touched.password)
                          || registFailed
                        }
                        required
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {t(formik.errors.password)}
                      </Form.Control.Feedback>
                      <Form.Label htmlFor="password">{t('placeholders.password_ph')}</Form.Label>
                    </Form.Group>
                    <Form.Group className="mt-4">
                      <Form.Control
                        id="confirmation"
                        type="password"
                        name="confirmation"
                        placeholder={t('placeholders.password_сonfirmation_ph')}
                        value={formik.values.confirmation}
                        onChange={formik.handleChange}
                        autoComplete="new-password"
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                        isInvalid={
                          (formik.errors.confirmPassword
                            && formik.touched.confirmPassword)
                            || registFailed
                          }
                        required
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {t(formik.errors.confirmation)}
                      </Form.Control.Feedback>
                      <Form.Label htmlFor="confirmation">{t('placeholders.password_сonfirmation_ph')}</Form.Label>
                    </Form.Group>
                    <Button type="submit" className="w-100 mb-3 mt-3" variant="outline-primary">
                      {t('authorization.signup_btn')}
                    </Button>
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
