import React from "react";

import OrderItem from "./OrderItem";
import "./OrderList.css";

const OrderList = (props) => {
  return (
    <ul className="order-list">
      {props.items.map((item) => (
        <OrderItem
          key={item._id}
          _id={item._id}
          orderItems={item.orderItems}
          shippingAddress={item.shippingAddress}
          payment={item.payment}
          itemsPrice={item.itemsPrice}
          shippingPrice={item.shippingPrice}
          tax={item.tax}
          totalPrice={item.totalPrice}
          isDelivered={item.isDelivered}
          createdAt={item.createdAt}
        />
      ))}
    </ul>
  );
};

export default OrderList;
