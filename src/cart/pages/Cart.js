import React, { useContext } from "react";
import { Link } from "react-router-dom";

import CartList from "../components/CartList";
import CartSummary from "../components/CartSummary";
import { CartContext } from "../../shared/context/cart-context";
import "./Cart.css";

const Cart = () => {
  const cart = useContext(CartContext);

  return (
    <div className="cart">
      {!cart.items.length && (
        <div className="cart-message">
          <h2>Your shopping cart is empty</h2>
          <p>
            click <Link to="/">here</Link> to shop now!
          </p>
        </div>
      )}
      {cart.items.length > 0 && <CartList items={cart.items} />}
      {cart.items.length > 0 && <CartSummary items={cart.items} />}
    </div>
  );
};

export default Cart;
