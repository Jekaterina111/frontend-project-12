import React from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import useAuth from '../hooks/index';

const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : <Button as={Link} to="/login" state={{ from: location }}>Log in</Button>
  );
};

export default AuthButton;
