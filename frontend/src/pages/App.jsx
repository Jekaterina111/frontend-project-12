import React, { useState, useMemo } from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate, useLocation,
} from 'react-router-dom';
import Header from '../components/Header';
import LoginPage from './LoginPage';
import ErrorPage from './ErrorPage';
import PrivatePage from './PrivatePage';
import RegistrationPage from './RegistrationPage';
import AuthContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userInfo');
    setLoggedIn(false);
  };
  const authContextProvider = useMemo(() => ({
    loggedIn, logIn, logOut,
  }), [loggedIn]);

  return (
    <AuthContext.Provider value={authContextProvider}>
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

const App = () => (
  <AuthProvider>
    <Router>
      <Header />
      <div className="container p-3">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/signup" element={<RegistrationPage />} />
          <Route
            path="/"
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
