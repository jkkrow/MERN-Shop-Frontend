import React from "react";
import { Link } from "react-router-dom";

import "./OrderItem.css";

const OrderItem = (props) => {
  return (
    <Link className="order-item" to={`/order-detail/${props._id}`}>
      <h4>Date: {props.createdAt.substring(0, 10).replaceAll("-", ".")}</h4>
      <h4>
        <span>Delievered: </span>
        <span
          style={props.isDelivered ? { color: "#269e42" } : { color: "red" }}
        >
          {props.isDelivered ? "O" : "Not Yet"}
        </span>
      </h4>
      {props.orderItems.map((item) => (
        <div className="order-item__product" key={item._id}>
          <img src={item.image} alt={item.title} />
          <div className="order-item__product-info">
            <p>{item.title}</p>
            <p>qty: {item.quantity}</p>
          </div>
        </div>
      ))}
      <h3>Total: ${props.totalPrice}</h3>
    </Link>
  );
};

export default OrderItem;
