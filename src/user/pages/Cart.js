import React, { useContext } from "react";
import { Link } from "react-router-dom";

import NumberInput from "../../shared/components/FormElements/NumberInput";
import { CartContext } from "../../shared/context/cart-context";
import "./Cart.css";

const Cart = (props) => {
  const cart = useContext(CartContext);

  return (
    <div className="cart">
      {!cart.items.length && <h2>Cart is empty!</h2>}
      <div className="cart-list">
        {cart.items.map((item) => (
          <div className="cart-item" key={item.product._id}>
            <div className="cart-item__image">
              <Link to={`/detail/${item.product._id}`}>
                <img src={item.product.images[0]} alt={item.product.title} />
              </Link>
            </div>
            <div className="cart-item__info">
              <Link to={`/detail/${item.product._id}`}>
                <h3 className="cart-item__info-title">{item.product.title}</h3>
              </Link>
              <h4 className="cart-item__info-price">${item.product.price}</h4>
              <div className="cart-item__info-quantity">
                <p>quantity: {item.quantity}</p>
                {/* <NumberInput initialValue={item.quantity} /> */}
              </div>
              <p className="cart-item__info-delete">delete</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
