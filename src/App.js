import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import NavBar from "./shared/components/Navigation/MainNavigation/NavBar";
import Products from "./products/pages/Products";
import ProductDetail from "./products/pages/ProductDetail";
import Cart from "./cart/pages/Cart";
import Login from "./auth/pages/Login";
import Signup from "./auth/pages/Signup";
import SetProduct from "./products/pages/SetProduct";
import MyProducts from "./user/pages/MyProducts";
import Address from "./user/pages/Address";
import PlaceOrder from "./order/pages/PlaceOrder";
import Orders from "./order/pages/Orders";
import OrderDetail from "./order/pages/OrderDetail";
import { AuthContext } from "./shared/context/auth-context";
import "./App.css";

const App = () => {
  const auth = useContext(AuthContext);

  let routes;

  if (auth.isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" component={Products} exact />
        <Route path="/detail/:productId" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
        <Route path="/new-product" component={SetProduct} />
        <Route path="/my-products" component={MyProducts} />
        <Route path="/address" component={Address} />
        <Route path="/edit-product/:productId" component={SetProduct} />
        <Route path="/place-order" component={PlaceOrder} />
        <Route path="/orders" component={Orders} />
        <Route path="/order-detail/:orderId" component={OrderDetail} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" component={Products} exact />
        <Route path="/detail/:productId" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <header>
        <NavBar />
      </header>
      <main>{routes}</main>
      <footer>Copyright &copy; MERN Shop</footer>
    </BrowserRouter>
  );
};

export default App;
