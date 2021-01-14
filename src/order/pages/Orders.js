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
  const [period, setPeriod] = useState("7 Days");
  const [remainder, setRemainder] = useState();
  const { pageLoaded, isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await sendRequest(
        `${process.env.REACT_APP_SERVER_URL}/user/orders?period=${calcPeriod(
          period
        )}`,
        "get",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      setOrders(response.data.orders);
      setRemainder(response.data.remainder);
    };
    fetchOrders();
  }, [auth, sendRequest, period]);

  const fetchMoreOrders = async () => {
    const response = await sendRequest(
      `${process.env.REACT_APP_SERVER_URL}/user/more-orders?period=${calcPeriod(
        period
      )}`,
      "post",
      { page },
      { Authorization: "Bearer " + auth.token }
    );
    setOrders(response.data.orders);
    setRemainder(response.data.remainder);
    setPage((prev) => prev + 1);
  };

  const changePeriodHandler = (event) => {
    setPeriod(event.target.value);
    setPage(1);
  };

  const calcPeriod = (arg) => {
    switch (arg) {
      case "7 Days":
        return new Date(new Date().setDate(new Date().getDate() - 7));
      case "1 Month":
        return new Date(new Date().setMonth(new Date().getMonth() - 1));
      case "6 Months":
        return new Date(new Date().setMonth(new Date().getMonth() - 6));
      case "1 Year":
        return new Date(new Date().setMonth(new Date().getMonth() - 12));
      default:
        return;
    }
  };

  return (
    <div className="orders">
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner overlay />}
      {pageLoaded && (
        <React.Fragment>
          <h2 className="page-title">Order History</h2>
          <select className="orders-select" onChange={changePeriodHandler}>
            <option>7 Days</option>
            <option>1 Month</option>
            <option>6 Months</option>
            <option>1 Year</option>
          </select>
        </React.Fragment>
      )}
      <OrderList items={orders} />
      {pageLoaded && !orders.length && (
        <p className="orders-none">No order found.</p>
      )}
      {remainder > 0 && <Button onClick={fetchMoreOrders}>See More</Button>}
    </div>
  );
};

export default Orders;
