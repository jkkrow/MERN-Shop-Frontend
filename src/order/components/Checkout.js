import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import StripeCheckout from "react-stripe-checkout";

import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { CartContext } from "../../shared/context/cart-context";
import "./Checkout.css";

const Checkout = () => {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);
  const [sdkReady, setSdkReady] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();

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
        const response = await axios(`${process.env.REACT_APP_SERVER_URL}/config/paypal`);
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
  }, [cart, history]);

  const successPaymentHandler = async (paymentResult) => {
    setPageLoading(true);
    await axios({
      url: `${process.env.REACT_APP_SERVER_URL}/user/create-order`,
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

  const stripeHandler = async (token) => {
    const response = await sendRequest(
      `${process.env.REACT_APP_SERVER_URL}/config/stripe`,
      "post",
      { totalPrice, token }
    );

    const result = response.data.result;

    if (result.status === "succeeded") {
      successPaymentHandler({
        id: result.id,
        status: "COMPLETED",
        payer: { email_address: result.receipt_email },
      });
    }
  };

  return (
    <div className="checkout">
      <ErrorModal error={error} onClear={clearError} />
      {(pageLoading || isLoading) && <LoadingSpinner overlay />}
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
          <div className="checkout-section__stripe">
            <StripeCheckout
              stripeKey={process.env.REACT_APP_STRIPE_KEY}
              token={stripeHandler}
              amount={totalPrice * 100}
            >
              <Button>Pay Now</Button>
            </StripeCheckout>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
