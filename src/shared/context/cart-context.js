import React, {
  useState,
  useCallback,
  createContext,
  useContext,
  useEffect,
} from "react";
import axios from "axios";

import { AuthContext } from "./auth-context";

export const CartContext = createContext({
  items: [],
  cartLoading: false,
  addItem: () => {},
  changeQuantity: () => {},
  removeItem: () => {},
});

export default (props) => {
  const auth = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("cart"));
    if (auth.isLoggedIn) {
      const fetchCart = async () => {
        setCartLoading(true);
        let response;
        if (
          storedData &&
          storedData.cart &&
          new Date(storedData.expiration) > new Date()
        ) {
          response = await axios({
            url: "http://localhost:5000/api/user/move-items",
            method: "post",
            data: { cart: storedData.cart },
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          });
          localStorage.removeItem('cart')
        } else {
          response = await axios({
            url: "http://localhost:5000/api/user/cart",
            method: "get",
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          });
        }
        setItems(response.data.cart);
        setCartLoading(false);
      };
      fetchCart();
    } else {
      if (
        storedData &&
        storedData.cart &&
        new Date(storedData.expiration) > new Date()
      ) {
        setItems(storedData.cart);
      } else {
        setItems([]);
        localStorage.removeItem("cart");
      }
    }
  }, [auth]);

  const addItem = useCallback(
    (item, quantity) => {
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
        const expiration = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
        localStorage.setItem(
          "cart",
          JSON.stringify({ cart: newCart, expiration })
        );
      }
    },
    [items, auth]
  );

  const changeQuantity = useCallback(
    (id, number) => {
      if (auth.isLoggedIn) {
        // id is updated cart
        setItems(id);
      } else {
        const updatedCart = [...items];
        const updatedItemIndex = updatedCart.findIndex(
          (item) => item.product._id === id
        );
        updatedCart[updatedItemIndex].quantity = number;
        setItems(updatedCart);
        const expiration = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
        localStorage.setItem(
          "cart",
          JSON.stringify({ cart: updatedCart, expiration })
        );
      }
    },
    [items, auth]
  );

  const removeItem = useCallback(
    (itemId) => {
      if (auth.isLoggedIn) {
        // itemId is updated cart
        setItems(itemId);
      } else {
        const newCart = items.filter((i) => i.product._id !== itemId);
        setItems(newCart);
        if (!newCart.length) {
          localStorage.removeItem("cart");
        } else {
          const expiration = new Date(
            new Date().getTime() + 1000 * 60 * 60 * 24
          );
          localStorage.setItem(
            "cart",
            JSON.stringify({ cart: newCart, expiration })
          );
        }
      }
    },
    [items, auth]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        cartLoading,
        addItem,
        changeQuantity,
        removeItem,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
