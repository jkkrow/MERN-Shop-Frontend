import React from "react";

import Button from "../../shared/components/FormElements/Button";

const CartSummary = (props) => (
  <div className="cart-summary">
    <h3 className="cart-summary__total">
      Total: $
      {props.items
        .reduce(
          (acc, currentItem) =>
            acc + currentItem.product.price * currentItem.quantity,
          0
        )
        .toFixed(2)}
    </h3>
    <div className="cart-summary__checkout">
      <Button>Checkout</Button>
    </div>
  </div>
);

export default CartSummary;
