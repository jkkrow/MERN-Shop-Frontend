import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import {
  Elements,
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { CartContext } from "../../shared/context/cart-context";
import "./Checkout.css";

const Checkout = () => {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);
  const [sdkReady, setSdkReady] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const history = useHistory();

  const stripePromise = loadStripe(
    "pk_test_51HXRw3ISbDFjf5hilOKiPM3rFNskeEqRHr2oR596Js8Ui2JtTVMlnH02flye8cXSXqPbBYsmFAxA2plr1vMxmCAV00zq3jZABv"
  );

  const itemsPrice = cart.items
    .reduce(
      (acc, currentItem) =>
        acc + currentItem.product.price * currentItem.quantity,
      0
    )
    .toFixed(2);
  const shippingPrice = (Number(itemsPrice) > 100 ? 0 : 5).toFixed(2);
  const tax = (Number(itemsPrice) > 100
    ? Number(itemsPrice) * 0.08
    : 0
  ).toFixed(2);
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(tax)
  ).toFixed(2);

  useEffect(() => {
    if (cart.items.length === 0) {
      return history.push("/cart");
    }

    if (cart.paymentMethod === "PayPal") {
      const addPayPalScript = async () => {
        setPageLoading(true);
        const response = await axios("http://localhost:5000/api/config/paypal");
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=${response.data.clientId}`;
        script.async = true;
        script.onload = () => {
          setSdkReady(true);
          setPageLoading(false);
        };
        document.body.appendChild(script);
      };
      addPayPalScript();
    }

    if (cart.paymentMethod === "Stripe") {
      const addStripeScript = async () => {
        const response = await axios("http://localhost:5000/api/config/stripe");
        console.log(response.data);
      };
      addStripeScript();
    }
  }, [cart, history]);

  const successPaymentHandler = async (paymentResult) => {
    setPageLoading(true);
    await axios({
      url: "http://localhost:5000/api/user/create-order",
      method: "post",
      data: {
        orderItems: cart.items.map((item) => ({
          title: item.product.title,
          price: item.product.price,
          image: item.product.images[0],
          quantity: item.quantity,
          product: item.product._id,
        })),
        shippingAddress: cart.shippingAddress,
        payment: {
          id: paymentResult.id,
          method: cart.paymentMethod,
          status: paymentResult.status,
          email_address: paymentResult.payer.email_address,
        },
        itemsPrice,
        shippingPrice,
        tax,
        totalPrice,
      },
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    });
    setPageLoading(false);
    cart.clearCart();
    history.push("/orders");
  };

  return (
    <div className="checkout">
      {pageLoading && <LoadingSpinner overlay />}
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
          <p>${itemsPrice}</p>
        </div>
        <div className="checkout-section__item">
          <p>Shipping</p>
          <p>${shippingPrice}</p>
        </div>
        <div className="checkout-section__item">
          <p>Tax</p>
          <p>${tax}</p>
        </div>
        <div className="checkout-section__item">
          <p>Total</p>
          <p>${totalPrice}</p>
        </div>
        {cart.paymentMethod === "PayPal" && sdkReady && !pageLoading && (
          <PayPalButton amount={totalPrice} onSuccess={successPaymentHandler} />
        )}
        {cart.paymentMethod === "Stripe" && (
          <form className="checkout-section__stripe-form">
            <Elements stripe={stripePromise}>
              <CardElement />
            </Elements>
            <Button type="submit">Pay Now</Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Checkout;
