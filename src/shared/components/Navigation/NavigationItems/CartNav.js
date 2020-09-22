import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { ReactComponent as CartIcon } from "../../../../assets/icons/cart.svg";
import { CartContext } from "../../../context/cart-context";
import "./CartNav.css";

const CartNav = (props) => {
  const cart = useContext(CartContext);

  return (
    <NavLink to="/cart" className="cart-nav">
      <CartIcon />
      <div className="cart-nav__number">{cart.items.length}</div>
    </NavLink>
  );
};

export default CartNav;
