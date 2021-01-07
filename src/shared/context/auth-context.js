import React, { useState, useCallback, createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  userData: {},
  login: () => {},
  logout: () => {},
});

export default (props) => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("user")) &&
      JSON.parse(localStorage.getItem("user")).token
  );
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : {}
  );

  const login = useCallback((token, userData) => {
    setToken(token);
    setUserData({
      userId: userData.userId,
      isAdmin: userData.isAdmin,
      email: userData.email,
      name: userData.name,
      image: userData.image,
    });
    localStorage.setItem(
      "user",
      JSON.stringify({
        token,
        userId: userData.userId,
        isAdmin: userData.isAdmin,
        email: userData.email,
        name: userData.name,
        image: userData.image,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserData({});
    localStorage.removeItem("user");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        userData,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
