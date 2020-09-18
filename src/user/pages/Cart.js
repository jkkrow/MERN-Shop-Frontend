import React, { useEffect } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";

const Cart = (props) => {
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchCart = async () => {
      const response = await sendRequest("http://localhost:5000/api/user/cart");
    };
    fetchCart();
  }, [sendRequest]);

  return <div></div>;
};

export default Cart;
