import React from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index';

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>{t('authorization.logout')}</Button>
      : <Button as={Link} to="/login" state={{ from: location }}>{t('authorization.login')}</Button>
  );
};

export default AuthButton;
