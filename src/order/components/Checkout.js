import React, { useContext } from "react";

import Button from "../../shared/components/FormElements/Button";
import { CartContext } from "../../shared/context/cart-context";
import "./Checkout.css";

const Checkout = () => {
  const cart = useContext(CartContext);

  const itemsTotal = cart.items
    .reduce(
      (acc, currentItem) =>
        acc + currentItem.product.price * currentItem.quantity,
      0
    );
  const shippingFee = itemsTotal > 100 ? 0 : 5;
  const tax = itemsTotal > 100 ? (itemsTotal * 0.08) : 0;
  const total = itemsTotal + shippingFee + tax;

  return (
    <div className="checkout">
      <div className="checkout-section">
        <div className="checkout-section__menu">
          <h2>Shipping</h2>
          <p>{`${cart.shippingAddress.address}, ${cart.shippingAddress.city}, ${cart.shippingAddress.postalCode}, ${cart.shippingAddress.country}`}</p>
        </div>
        <div className="checkout-section__menu">
          <h2>Payment Method</h2>
          <p>{cart.paymentMethod}</p>
        </div>
        <div className="checkout-section__menu">
          <h2>Order Items</h2>
          {cart.items.map((item) => (
            <div className="checkout-section__item" key={item._id}>
              <img src={item.product.images[0]} alt={item.product.title} />
              <p>{item.product.title}</p>
              <p>{`${item.quantity} x $${item.product.price} = $${(
                item.quantity * item.product.price
              ).toFixed(2)}`}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="checkout-section">
        <h2>Order Summary</h2>
        <div className="checkout-section__item">
          <p>Items</p>
          <p>${itemsTotal.toFixed(2)}</p>
        </div>
        <div className="checkout-section__item">
          <p>Shipping</p>
          <p>${shippingFee.toFixed(2)}</p>
        </div>
        <div className="checkout-section__item">
          <p>Tax</p>
          <p>${tax.toFixed(2)}</p>
        </div>
        <div className="checkout-section__item">
          <p>Total</p>
          <p>${total.toFixed(2)}</p>
        </div>
        <Button>Checkout</Button>
      </div>
    </div>
  );
};

export default Checkout;
