import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { ReactComponent as CartIcon } from "../../../../assets/icons/cart.svg";
import { CartContext } from "../../../context/cart-context";
import "./CartNav.css";

const CartNav = () => {
  const cart = useContext(CartContext);

  return (
    <NavLink to="/cart" className="cart-nav">
      <CartIcon />
      {!cart.cartLoading && (
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
