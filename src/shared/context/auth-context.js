import React, { useState, useCallback, createContext, useEffect } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  userId: null,
  image: null,
  login: () => {},
  logout: () => {},
});

export default (props) => {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [image, setImage] = useState();

  const login = useCallback((token, userId, image, expirationDate) => {
    setToken(token);
    setUserId(userId);
    setImage(image);
    const tokenExpiresIn =
      expirationDate ||
      new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        token,
        userId,
        image,
        expiration: tokenExpiresIn.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setImage(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.token,
        storedData.userId,
        storedData.image,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

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
