import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import {
  Button, Form, Card, Container, Row, Col,
} from 'react-bootstrap';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const LoginPage = () => {
  const { t } = useTranslation();
  const loginSchema = yup.object().shape({
    username: yup.string().required(t('validation_errors.is_required')),
    password: yup.string().required(t('validation_errors.is_required')),
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
        toast.success(t('toast_messages.success'));
        const { from } = location.state;
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err(toast.error(t('auth_errors.unauthorized')));
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <h1 className="text-center mt-5 mb-4">Welcome to Sluck Chat</h1>
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
                      <Form.Group>
                        <h1 className="text-center mb-4">{t('authorization.login')}</h1>
                        <Form.Label htmlFor="username">Ваш ник</Form.Label>
                        <Form.Control
                          type="username"
                          name="username"
                          placeholder={t('placeholders.username_ph')}
                          id="username"
                          autoComplete="username"
                          value={formik.values.username}
                          onChange={formik.handleChange}
                          isInvalid={authFailed}
                          required
                          ref={inputRef}
                        />
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
                          isInvalid={authFailed}
                          required
                        />
                        <Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
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
                <span className="me-1">Нет аккаунта?</span>
                <Link to="/signup">t(authorization.signup)</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default LoginPage;
