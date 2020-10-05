import React from "react";
import { NavLink } from "react-router-dom";
import "./CheckoutSteps.css";

import Card from "../../shared/components/UI/Card";

const CheckoutSteps = (props) => (
  <Card className="checkout-steps">
    <NavLink to="#">Login</NavLink>
    <span>{">>"}</span>
    <NavLink
      to="/shipping"
      className={`${!props.step2 && "checkout-steps_link-disabled"}`}
    >
      Shipping
    </NavLink>
    <span className={`${!props.step2 && "checkout-steps_link-disabled"}`}>
      {">>"}
    </span>
    <NavLink
      to="/payment"
      className={`${!props.step3 && "checkout-steps_link-disabled"}`}
    >
      Payment
    </NavLink>
    <span className={`${!props.step3 && "checkout-steps_link-disabled"}`}>
      {">>"}
    </span>
    <NavLink
      to="/place-order"
      className={`${!props.step4 && "checkout-steps_link-disabled"}`}
    >
      Place Order
    </NavLink>
  </Card>
);

export default CheckoutSteps;
