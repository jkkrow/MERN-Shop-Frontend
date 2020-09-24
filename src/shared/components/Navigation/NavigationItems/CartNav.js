import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { ReactComponent as CartIcon } from "../../../../assets/icons/cart.svg";
import { useHttpClient } from "../../../hooks/http-hook";
import { CartContext } from "../../../context/cart-context";
import { AuthContext } from "../../../context/auth-context";
import "./CartNav.css";

const CartNav = () => {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);
  const { isLoading, sendRequest } = useHttpClient();

  const { getItems } = cart;
  useEffect(() => {
    const fetchCart = async () => {
      if (auth.isLoggedIn) {
        const response = await sendRequest(
          "http://localhost:5000/api/user/cart",
          "get",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        getItems(response.data.cart);
      } else {
        getItems();
      }
    };
    fetchCart();
  }, [sendRequest, auth, getItems]);

  return (
    <NavLink to="/cart" className="cart-nav">
      <CartIcon />
      {!isLoading && (
        <div className="cart-nav__number">
          {cart.items.reduce(
            (acc, currentItem) => acc + currentItem.quantity,
            0
          )}
        </div>
      )}
    </NavLink>
  );
};

export default CartNav;
