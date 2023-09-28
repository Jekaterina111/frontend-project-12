import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(5, 'Минимум 5 букв')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
  lastName: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
});

const LoginPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userInfo', JSON.stringify(res.data));
        auth.login();
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <fieldset>
        <Form.Group>
          <Form.Control
            name="username"
            placeholder="username"
            id="username"
            autoComplete="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            isInvalid={authFailed}
            required
            ref={inputRef}
          />
          <Form.Label htmlFor="username">Username</Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            name="password"
            placeholder="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            autoComplete="current-password"
            isInvalid={authFailed}
            required
          />
          <Form.Label htmlFor="password">Пароль</Form.Label>
          <Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
        </Form.Group>
        <Button variant="outline-primary" type="submit">
          Войти
        </Button>
      </fieldset>
    </Form>
  );
};
export default LoginPage;
