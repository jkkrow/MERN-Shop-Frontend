import React, { useContext, useEffect, useState } from "react";

import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./AdminOrders.css";

const AdminOrders = () => {
  const auth = useContext(AuthContext);
  const [fetchedOrders, setFetchedOrders] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await sendRequest(
        "http://localhost:5000/api/admin/orders",
        "get",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      setFetchedOrders(response.data.orders);
    };
    fetchOrders();
  }, [auth, sendRequest]);

  return (
    <div className="admin-orders">
      {isLoading && <LoadingSpinner overlay />}
      <h1>Orders</h1>
      <div className="admin-orders__table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>User</th>
              <th>Total</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fetchedOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.user.name}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isDelivered ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <Button to={`/order-detail/${order._id}`}>Detail</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
