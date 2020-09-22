import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import AuthProvider from "./shared/context/auth-context";
import CartProvider from "./shared/context/cart-context";

ReactDOM.render(
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>,
  document.getElementById("root")
);
