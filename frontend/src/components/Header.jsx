import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import SwitchLang from './SwitchLang';

const Header = () => {
  const { t } = useTranslation();
  return (
    <>
      <Navbar bg="white" expand="lg" className="light shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/login">{t('logo')}</Navbar.Brand>
          <SwitchLang />
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Header;
