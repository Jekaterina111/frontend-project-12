import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AuthButton from './AuthButton';
import SwitchLang from './SwitchLang';

const Header = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <SwitchLang />
        <Container>
          <Navbar.Brand as={Link} to="/">{t('logo')}</Navbar.Brand>
          <AuthButton />
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default Header;
