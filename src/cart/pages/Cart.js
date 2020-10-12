import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import CartList from "../components/CartList";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { CartContext } from "../../shared/context/cart-context";
import "./Cart.css";

const Cart = ({ history }) => {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);

  const checkoutHandler = () => {
    auth.isLoggedIn
      ? history.push("/place-order")
      : history.push("/login?redirect=place-order");
  };

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
        <div className="cart-summary">
          <h2 className="cart-summary__total">
            Total: $
            {cart.items
              .reduce(
                (acc, currentItem) =>
                  acc + currentItem.product.price * currentItem.quantity,
                0
              )
              .toFixed(2)}
          </h2>
          <div className="cart-summary__checkout">
            <Button onClick={checkoutHandler}>Checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
