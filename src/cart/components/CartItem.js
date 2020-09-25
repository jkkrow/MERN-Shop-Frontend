import React, { useContext } from "react";
import { Link } from "react-router-dom";

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
          "http://localhost:5000/api/user/change-quantity",
          "post",
          { productId: props.id, quantity: num },
          { Authorization: "Bearer " + auth.token }
        );
        cart.changeQuantity(response.data.cart);
      }, 500);
    } else {
      cart.changeQuantity(props.id, num);
    }
  };

  const removeItemHandler = async () => {
    if (auth.isLoggedIn) {
      const response = await sendRequest(
        `http://localhost:5000/api/user/remove-from-cart/${props.id}`,
        "delete",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      cart.removeItem(response.data.cart);
    } else {
      cart.removeItem(props.id);
    }
  };

  return (
    <li className="cart-item" key={props._id}>
      {isLoading && <LoadingSpinner overlay />}
      <div className="cart-item__image">
        <Link to={`/detail/${props.id}`}>
          <img src={props.images[0]} alt={props.title} />
        </Link>
      </div>
      <div className="cart-item__info">
        <Link to={`/detail/${props.id}`}>
          <h2 className="cart-item__info-title">{props.title}</h2>
        </Link>
        <h3 className="cart-item__info-price">${props.price}</h3>
        <div className="cart-item__info-quantity">
          <p>quantity: </p>
          <NumberInput
            initialValue={props.quantity}
            onValue={quantityChangeHandler}
          />
        </div>
        <p className="cart-item__info-delete" onClick={removeItemHandler}>
          remove
        </p>
      </div>
    </li>
  );
};

export default CartItem;
