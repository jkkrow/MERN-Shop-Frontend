import React, { useState, useCallback, createContext, useContext } from "react";

import { AuthContext } from "./auth-context";

export const CartContext = createContext({
  items: [],
  getItems: () => {},
  addItem: () => {},
  removeItem: () => {},
});

export default (props) => {
  const auth = useContext(AuthContext);
  const [items, setItems] = useState([]);

  const getItems = useCallback(
    (items) => {
      if (auth.isLoggedIn) {
        setItems(items);
      } else {
        const storedData = JSON.parse(localStorage.getItem("cart"));
        if (storedData && storedData.cart) {
          setItems(storedData.cart);
        } else {
          setItems([]);
        }
      }
    },
    [auth]
  );

  const addItem = useCallback(
    async (item, quantity) => {
      if (auth.isLoggedIn) {
        // item is updated cart
        setItems(item);
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
    [items, auth]
  );

  const removeItem = useCallback(
    async (itemId) => {
      if (auth.isLoggedIn) {
        // itemId is updated cart
        setItems(itemId);
      } else {
        const newCart = items.filter((i) => i.product._id !== itemId);
        setItems(newCart);
        if (!newCart.length) {
          localStorage.removeItem("cart");
        } else {
          localStorage.setItem("cart", JSON.stringify({ cart: newCart }));
        }
      }
    },
    [items, auth]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        getItems,
        addItem,
        removeItem,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
