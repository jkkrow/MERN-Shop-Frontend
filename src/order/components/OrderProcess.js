import React from "react";
import "./OrderProcess.css";

const CheckoutSteps = (props) => {
  const linkHandler = (link) => {
    props.to(link);
  };

  return (
    <div className="order-process">
      <div to="#">Login</div>
      <span>{">>"}</span>
      <div
        onClick={() => linkHandler("shipping")}
        className={`${
          !(
            props.orderProcess === "shipping" ||
            props.orderProcess === "payment" ||
            props.orderProcess === "checkout"
          ) && "order-process_link-disabled"
        }`}
      >
        Shipping
      </div>
      <span
        className={`${
          !(
            props.orderProcess === "shipping" ||
            props.orderProcess === "payment" ||
            props.orderProcess === "checkout"
          ) && "order-process_link-disabled"
        }`}
      >
        {">>"}
      </span>
      <div
        onClick={() => linkHandler("payment")}
        className={`${
          !(
            props.orderProcess === "payment" ||
            props.orderProcess === "checkout"
          ) && "order-process_link-disabled"
        }`}
      >
        Payment
      </div>
      <span
        className={`${
          !(
            props.orderProcess === "payment" ||
            props.orderProcess === "checkout"
          ) && "order-process_link-disabled"
        }`}
      >
        {">>"}
      </span>
      <div
        onClick={() => linkHandler("checkout")}
        className={`${
          !(props.orderProcess === "checkout") &&
          "order-process_link-disabled"
        }`}
      >
        Checkout
      </div>
    </div>
  );
};

export default CheckoutSteps;
