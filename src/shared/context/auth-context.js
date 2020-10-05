import React, { useState, useCallback, createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  userId: null,
  image: null,
  login: () => {},
  logout: () => {},
});

export default (props) => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("userData")) &&
      JSON.parse(localStorage.getItem("userData")).token
  );
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("userData")) &&
      JSON.parse(localStorage.getItem("userData")).userId
  );
  const [image, setImage] = useState(
    JSON.parse(localStorage.getItem("userData")) &&
      JSON.parse(localStorage.getItem("userData")).image
  );

  const login = useCallback((token, userId, image) => {
    setToken(token);
    setUserId(userId);
    setImage(image);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        token,
        userId,
        image,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setImage(null);
    localStorage.removeItem("userData");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        userId,
        image,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
