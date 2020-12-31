import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Card from "../../shared/components/UI/Card";
import Button from "../../shared/components/FormElements/Button";
import CartList from "../components/CartList";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { CartContext } from "../../shared/context/cart-context";
import "./Cart.css";

const Cart = ({ history }) => {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const checkoutHandler = async () => {
    if (!auth.isLoggedIn) {
      history.push("/login?redirect=place-order");
    } else {
      await sendRequest(
        "http://localhost:5000/api/user/start-checkout",
        "post",
        { cart: cart.items },
        { Authorization: "Bearer " + auth.token }
      );
      history.push("/place-order");
    }
  };

  return (
    <div className="cart">
      <ErrorModal
        error={error}
        onClear={clearError}
        header={"Checkout Failed!"}
      />
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
        <Card className="cart-summary">
          <h2 className="cart-summary__total">
            Total $
            {cart.items
              .reduce(
                (acc, currentItem) =>
                  acc + currentItem.product.price * currentItem.quantity,
                0
              )
              .toFixed(2)}
          </h2>
          <div className="cart-summary__checkout">
            <Button
              onClick={checkoutHandler}
              loading={isLoading}
              disabled={cart.items.find(
                (item) => item.quantity > item.product.quantity
              )}
            >
              Checkout
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Cart;
