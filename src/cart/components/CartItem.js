import React, { useContext } from "react";
import { Link } from "react-router-dom";

// import NumberInput from "../../shared/components/FormElements/NumberInput";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { CartContext } from "../../shared/context/cart-context";
import "./CartItem.css";

const CartItem = (props) => {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);
  const { isLoading, sendRequest } = useHttpClient();

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
          <h3 className="cart-item__info-title">{props.title}</h3>
        </Link>
        <h4 className="cart-item__info-price">${props.price}</h4>
        <div className="cart-item__info-quantity">
          <p>quantity: {props.quantity}</p>
          {/* <NumberInput initialValue={item.quantity} /> */}
        </div>
        <p className="cart-item__info-delete" onClick={removeItemHandler}>
          remove
        </p>
      </div>
    </li>
  );
};

export default CartItem;
