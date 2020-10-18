import React, { useState, useCallback, createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  userId: null,
  isAdmin: null,
  image: null,
  login: () => {},
  logout: () => {},
});

export default (props) => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("user")) &&
      JSON.parse(localStorage.getItem("user")).token
  );
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("user")) &&
      JSON.parse(localStorage.getItem("user")).userId
  );
  const [image, setImage] = useState(
    JSON.parse(localStorage.getItem("user")) &&
      JSON.parse(localStorage.getItem("user")).image
  );
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem("user")) &&
      JSON.parse(localStorage.getItem("user")).isAdmin
  );

  const login = useCallback((token, userData) => {
    setToken(token);
    setUserId(userData.userId);
    setIsAdmin(userData.isAdmin);
    setImage(userData.image);
    localStorage.setItem(
      "user",
      JSON.stringify({
        token,
        userId: userData.userId,
        isAdmin: userData.isAdmin,
        image: userData.image,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setIsAdmin(null);
    setImage(null);
    localStorage.removeItem("user");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        userId,
        isAdmin,
        image,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
