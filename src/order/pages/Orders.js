import React, { useContext, useEffect, useState } from "react";

import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import OrderList from "../components/OrderList";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./Orders.css";

const Orders = () => {
  const auth = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [remainder, setRemainder] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await sendRequest(
        `${process.env.REACT_APP_SERVER_URL}/user/orders`,
        "get",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      setOrders(response.data.orders);
      setRemainder(response.data.remainder);
    };
    fetchOrders();
  }, [auth, sendRequest]);

  const fetchMoreOrders = async () => {
    const response = await sendRequest(
      `${process.env.REACT_APP_SERVER_URL}/user/more-orders`,
      "post",
      { page },
      { Authorization: "Bearer " + auth.token }
    );
    setOrders(response.data.orders);
    setRemainder(response.data.remainder);
    setPage((prev) => prev + 1);
  };

  return (
    <div className="orders">
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner overlay />}
      <h2 className="page-title">Order History</h2>
      <OrderList items={orders} />
      {remainder > 0 && <Button onClick={fetchMoreOrders}>See More</Button>}
    </div>
  );
};

export default Orders;
