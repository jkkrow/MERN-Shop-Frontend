import React, { useContext } from "react";
import { Link } from "react-router-dom";

import CartList from "../components/CartList";
import CartSummary from "../components/CartSummary";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { CartContext } from "../../shared/context/cart-context";
import "./Cart.css";

const Cart = () => {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);

  return (
    <div className="cart">
      {auth.isLoggedIn && cart.cartLoading && <LoadingSpinner overlay />}
      {!cart.cartLoading && !cart.items.length && (
        <div className="cart-message">
          <h2>Your shopping cart is empty</h2>
          <p>
            click <Link to="/">here</Link> to shop now!
          </p>
        </div>
      )}
      {!cart.cartLoading && cart.items.length > 0 && (
        <CartList items={cart.items} />
      )}
      {!cart.cartLoading && cart.items.length > 0 && (
        <CartSummary items={cart.items} />
      )}
    </div>
  );
};

export default Cart;
