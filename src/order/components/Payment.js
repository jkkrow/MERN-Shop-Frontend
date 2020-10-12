import React, { useContext, useState } from "react";

import Button from "../../shared/components/FormElements/Button";
import { CartContext } from "../../shared/context/cart-context";
import "./Payment.css";

const Payment = () => {
  const cart = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const submitHandler = (event) => {
    event.preventDefault();
    cart.savePaymentMethod(paymentMethod);
    cart.updateOrderProcess("checkout");
  };

  return (
    <div className="payment">
      <h1>Payment Method</h1>
      <form>
        <label className="payment-method">
          <input
            type="radio"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            defaultChecked
            onClick={(e) => setPaymentMethod(e.target.value)}
          />
          PayPal or Credit Card
        </label>
        <label className="payment-method">
          <input
            type="radio"
            id="Stripe"
            name="paymentMethod"
            value="Stripe"
            onClick={(e) => setPaymentMethod(e.target.value)}
          />
          Stripe
        </label>
        <Button type="submit" onClick={submitHandler}>
          Continue
        </Button>
      </form>
    </div>
  );
};

export default Payment;
