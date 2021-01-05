import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Card from "../../shared/components/UI/Card";
import NumberInput from "../../shared/components/FormElements/NumberInput";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { CartContext } from "../../shared/context/cart-context";
import "./CartItem.css";

const CartItem = (props) => {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);
  const { isLoading, sendRequest } = useHttpClient();

  let timer;
  const quantityChangeHandler = async (num) => {
    if (auth.isLoggedIn) {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        const response = await sendRequest(
          `${process.env.REACT_APP_SERVER_URL}/user/change-quantity`,
          "patch",
          { productId: props._id, quantity: num },
          { Authorization: "Bearer " + auth.token }
        );
        cart.changeQuantity(response.data.cart);
      }, 500);
    } else {
      cart.changeQuantity(props._id, num);
    }
  };

  const removeItemHandler = async () => {
    if (auth.isLoggedIn) {
      const response = await sendRequest(
        `${process.env.REACT_APP_SERVER_URL}/user/remove-from-cart/${props._id}`,
        "delete",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      cart.removeItem(response.data.cart);
    } else {
      cart.removeItem(props._id);
    }
  };

  return (
    <Card className="cart-item" key={props._id}>
      {isLoading && <LoadingSpinner overlay />}
      <div className="cart-item__image">
        <Link to={`/detail/${props._id}`}>
          <img src={props.images[0]} alt={props.title} />
        </Link>
      </div>
      <div className="cart-item__info">
        <Link to={`/detail/${props._id}`}>
          <h2 className="cart-item__info-title">{props.title}</h2>
        </Link>
        <h3 className="cart-item__info-price">${props.price.toFixed(2)}</h3>
        {props.stock === 0 ? (
          <div className="cart-item__info-quantity">
            <p style={{ color: "red" }}>This product is out of stock.</p>
          </div>
        ) : (
          <div className="cart-item__info-quantity">
            <p>quantity: </p>
            <NumberInput
              initialValue={props.quantity}
              onValue={quantityChangeHandler}
              maxValue={props.stock}
            />
            <p
              style={
                props.stock >= props.quantity
                  ? { color: "green", fontSize: "small" }
                  : { color: "red", fontSize: "small" }
              }
            >{`${props.stock} in stock`}</p>
          </div>
        )}
        <p className="cart-item__info-delete" onClick={removeItemHandler}>
          remove
        </p>
      </div>
    </Card>
  );
};

export default CartItem;
