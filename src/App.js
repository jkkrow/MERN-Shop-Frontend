import React, { useState, useCallback } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import NavBar from "./shared/components/Navigation/MainNavigation/NavBar";
import Products from "./products/pages/Products";
import ProductDetail from "./products/pages/ProductDetail";
import Cart from "./user/pages/Cart";
import Login from "./auth/pages/Login";
import Signup from "./auth/pages/Signup";
import SetProduct from "./products/pages/SetProduct";
import MyProducts from "./user/pages/MyProducts";
import { AuthContext } from "./shared/context/auth-context";
import "./App.css";

const App = () => {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [image, setImage] = useState();

  const login = useCallback((token, userId, image) => {
    setToken(token);
    setUserId(userId);
    setImage(image);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setImage(null);
  }, []);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" component={Products} exact />
        <Route path="/detail/:productId" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
        <Route path="/new-product" component={SetProduct} />
        <Route path="/my-products" component={MyProducts} />
        <Route path="/edit-product/:productId" component={SetProduct} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" component={Products} exact />
        <Route path="/detail/:productId" component={ProductDetail} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        image: image,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        <NavBar />
        <main>{routes}</main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
