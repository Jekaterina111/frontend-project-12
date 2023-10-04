import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import {
  Button, Form, Card, Container, Row, Col,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const RegistrationPage = () => {
  const auth = useAuth();
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const registrationSchema = yup.object().shape({
    username: yup.string()
      .trim()
      .min(5, 'Минимум 5 букв')
      .max(50, 'Максимум 50 букв')
      .required('Обязательное поле'),
    password: yup.string()
      .trim()
      .min(2, 'Минимум 2 буквы')
      .max(50, 'Максимум 50 букв')
      .required('Обязательное поле'),
    confirmation: yup.string()
      .oneOf([yup.ref('password')])
      .required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmation: '',
    },
    validationSchema: registrationSchema,
    onSubmit: async (values) => {
      setRegistrationFailed(false);

      try {
        const res = await axios.post(routes.signUpPath(), {
          username: values.username,
          password: values.password,
        });
        localStorage.setItem('userInfo', JSON.stringify(res.data));
        auth.logIn(res.data);
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setRegistrationFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Container fluid className="h-100">
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
                        <h1 className="text-center mb-4">Войти</h1>
                        <Form.Label htmlFor="username">Ваш ник</Form.Label>
                        <Form.Control
                          name="username"
                          placeholder="Ваш ник"
                          id="username"
                          autoComplete="username"
                          value={formik.values.username}
                          onChange={formik.handleChange}
                          isInvalid={registrationFailed}
                          required
                          ref={inputRef}
                        />
                        <Form.Control.Feedback type="invalid">Неверное имя пользователя</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mt-3">
                        <Form.Label htmlFor="password">Пароль</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Пароль"
                          id="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          autoComplete="current-password"
                          isInvalid={registrationFailed}
                          required
                        />
                        <Form.Control.Feedback type="invalid">Неверныи пароль</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mt-3">
                        <Form.Label htmlFor="confirmation">Пароль</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmation"
                          placeholder="Пароль"
                          id="confirmation"
                          value={formik.values.confirmation}
                          onChange={formik.handleChange}
                          autoComplete="confirmation"
                          isInvalid={registrationFailed}
                          required
                        />
                        <Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
                      </Form.Group>
                      <Button type="submit" className="w-100 mb-3 mt-3 outline-primary">
                        Войти
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
