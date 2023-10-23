import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import {
  Button, Form, Card, Container, Row, Col,
} from 'react-bootstrap';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const LoginPage = () => {
  const { t } = useTranslation();
  const loginSchema = Yup.object().shape({
    username: Yup.string().required(t('validation_errors.is_required')),
    password: Yup.string().required(t('validation_errors.is_required')),
  });

  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userInfo', JSON.stringify(res.data));
        auth.logIn();
        const { from } = location.state;
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        console.error(err.message);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
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
                  <fieldset disabled={formik.isSubmitting}>
                    <Form onSubmit={formik.handleSubmit}>
                      <h1 className="text-center mb-4">{t('authorization.login')}</h1>
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="username"
                          name="username"
                          onBlur={formik.handleBlur}
                          placeholder={t('placeholders.username_ph')}
                          id="username"
                          autoComplete="username"
                          value={formik.values.username}
                          onChange={formik.handleChange}
                          isInvalid={
                            (formik.errors.username && formik.touched.username)
                            || authFailed
                          }
                          required
                          ref={inputRef}
                        />
                        <Form.Label htmlFor="username">{t('placeholders.username_ph')}</Form.Label>
                        <Form.Control.Feedback type="invalid" tooltip placement="right">
                          {t(formik.errors.username)}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mt-3">
                        <Form.Control
                          type="password"
                          name="password"
                          onBlur={formik.handleBlur}
                          placeholder={t('placeholders.password_ph')}
                          id="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          autoComplete="current-password"
                          isInvalid={
                            (formik.errors.password && formik.touched.password)
                            || authFailed
                          }
                          required
                        />
                        <Form.Label htmlFor="password">{t('placeholders.password_ph')}</Form.Label>
                        <Form.Control.Feedback type="invalid" tooltip>{t(formik.errors.password)}</Form.Control.Feedback>
                      </Form.Group>
                      <Button type="submit" className="w-100 mb-3 mt-3 outline-primary">
                        {t('authorization.login')}
                      </Button>
                    </Form>
                  </fieldset>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span className="me-1">{t('authorization.confirm')}</span>
                <Link to="/signup">{t('authorization.signup')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default LoginPage;
