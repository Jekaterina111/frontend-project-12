import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import ErrorPage from './ErrorPage';
import PrivatePage from './PrivatePage';
import AuthContext from '../contexts/index.jsx';

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

const App = () => (
  <AuthProvider>
    <div className="container p-3">
      <h1 className="text-center mt-5 mb-4">Welcome to Sluck Chat</h1>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<PrivatePage />} />
          <Route exact path="/error" element={<ErrorPage />} />
          <Route exact path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  </AuthProvider>
);

export default App;
