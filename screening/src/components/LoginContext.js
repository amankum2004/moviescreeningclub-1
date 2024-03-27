import React, { createContext, useContext, useState, useEffect } from 'react';

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const login = () => setLoggedIn(true);
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUserEmail'); 
    localStorage.removeItem('signupEmail'); 
    setLoggedIn(false);
  };

  return (
    <LoginContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
