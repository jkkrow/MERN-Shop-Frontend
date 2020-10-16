import React, { useContext, useEffect, useState } from "react";

import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import OrderList from "../components/OrderList";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./Orders.css";

const Orders = () => {
  const auth = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await sendRequest(
        "http://localhost:5000/api/user/orders",
        "get",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      setOrders(response.data.orders);
    };
    fetchOrders();
  }, [auth, sendRequest]);
  return (
    <div className="orders">
      {isLoading && <LoadingSpinner overlay />}
      <h1>Order History</h1>
      <OrderList items={orders} />
    </div>
  );
};

export default Orders;
