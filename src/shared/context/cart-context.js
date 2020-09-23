import React, {
  useState,
  useCallback,
  createContext,
  useContext,
  useEffect,
} from "react";

import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "./auth-context";

export const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
});

export default (props) => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!auth.isLoggedIn) {
      const storedData = JSON.parse(localStorage.getItem("cart"));
      if (storedData && storedData.cart) {
        setItems(storedData.cart);
      } else {
        setItems([]);
      }
    } else {
      const fetchCart = async () => {
        const response = await sendRequest(
          "http://localhost:5000/api/user/cart",
          "get",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        setItems(response.data.cart);
      };
      fetchCart();
    }
  }, [auth, sendRequest]);

  const addItem = useCallback(
    async (item, quantity) => {
      if (auth.isLoggedIn) {
        const response = await sendRequest(
          "http://localhost:5000/api/user/add-to-cart",
          "post",
          { item, quantity },
          { Authorization: "Bearer " + auth.token }
        );
        setItems(response.data.cart);
      } else {
        let newCart = [...items];
        const index = items.findIndex((i) => i.product._id === item._id);
        if (index !== -1) {
          const newQuantity = items[index].quantity + quantity;
          newCart[index].quantity = newQuantity;
        } else {
          newCart.push({ product: item, quantity });
        }
        setItems(newCart);
        localStorage.setItem("cart", JSON.stringify({ cart: newCart }));
      }
    },
    [items, auth, sendRequest]
  );

  const removeItem = useCallback(
    async (item) => {
      if (auth.isLoggedIn) {
        const response = await sendRequest(
          `http://localhost:5000/api/user/remove-from-cart/${item._id}`,
          "delete",
          null,
          { Authorization: "Bearer " + auth.token }
        );
        setItems(response.data.cart);
      } else {
        const newCart = items.filter((i) => i.product._id !== item._id);
        setItems(newCart);
        if (!newCart.length) {
          localStorage.removeItem("cart");
        } else {
          localStorage.setItem("cart", JSON.stringify({ cart: newCart }));
        }
      }
    },
    [items, auth, sendRequest]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
