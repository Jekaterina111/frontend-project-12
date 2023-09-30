import React, { useState, useMemo } from 'react';
import {
  BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation,
} from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import LoginPage from './LoginPage';
import ErrorPage from './ErrorPage';
import PrivatePage from './PrivatePage';
import AuthContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userInfo');
    setLoggedIn(false);
  };

  const providerContext = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return (
    <AuthContext.Provider value={providerContext}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};
const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : <Button as={Link} to="/login" state={{ from: location }}>Log in</Button>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar bg="light" expand="lg">
        <AuthButton />
      </Navbar>
      <div className="container p-3">
        <h1 className="text-center mt-5 mb-4">Welcome to Sluck Chat</h1>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={null} />
          <Route path="/error" element={<ErrorPage />} />
          <Route
            path="/private"
            element={(
              <PrivateRoute>
                <PrivatePage />
              </PrivateRoute>
            )}
          />
        </Routes>
      </div>
    </Router>
  </AuthProvider>
);

export default App;
