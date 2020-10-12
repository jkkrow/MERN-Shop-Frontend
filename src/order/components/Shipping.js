import React from "react";

import Address from "../../user/pages/Address";
import "./Shipping.css";

const Shipping = () => {
  return (
    <div className="shipping">
      <div className="shipping-address">
        <Address />
      </div>
    </div>
  );
};

export default Shipping;
