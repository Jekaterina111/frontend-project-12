import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import AuthButton from './AuthButton';

const Header = () => (
  <div className="d-flex flex-column h-100">
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
        <AuthButton />
      </Container>
    </Navbar>
    <Outlet />
  </div>
);

export default Header;
