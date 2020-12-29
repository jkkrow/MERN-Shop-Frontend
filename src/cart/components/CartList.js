import React from "react";

import CartItem from "./CartItem";
import "./CartList.css";

const CartList = (props) => (
  <ul className="cart-list">
    {props.items.map((item) => (
      <CartItem
        key={item.product._id}
        _id={item.product._id}
        title={item.product.title}
        price={item.product.price}
        images={item.product.images}
        stock={item.product.quantity}
        quantity={item.quantity}
      />
    ))}
  </ul>
);

export default CartList;
