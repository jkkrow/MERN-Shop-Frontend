import React, { useContext } from "react";

import OrderProcess from "../components/OrderProcess";
import Shipping from "../components/Shipping";
import Payment from "../components/Payment";
import Checkout from "../components/Checkout";
import { CartContext } from "../../shared/context/cart-context";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const { orderProcess, updateOrderProcess } = useContext(CartContext);

  return (
    <div className="place-order">
      <OrderProcess orderProcess={orderProcess} to={updateOrderProcess} />
      {orderProcess === "shipping" && <Shipping />}
      {orderProcess === "payment" && <Payment />}
      {orderProcess === "checkout" && <Checkout />}
    </div>
  );
};

export default PlaceOrder;
