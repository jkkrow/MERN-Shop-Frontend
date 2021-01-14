import React, { useContext, useEffect, useState } from "react";

import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import Pagination from "../../shared/components/UI/Pagination";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./AdminOrders.css";

const AdminOrders = ({ match }) => {
  const auth = useContext(AuthContext);
  const [fetchedOrders, setFetchedOrders] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const { pageLoaded, isLoading, sendRequest } = useHttpClient();
  const currentPage = match.params.currentPage || "";

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await sendRequest(
        `${process.env.REACT_APP_SERVER_URL}/admin/orders?page=${currentPage}`,
        "get",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      setFetchedOrders(response.data.orders);
      setTotalPage(response.data.pages);
    };
    fetchOrders();
  }, [auth, sendRequest, currentPage]);

  return (
    <div className="admin-orders">
      {isLoading && <LoadingSpinner overlay />}
      {pageLoaded && (
        <React.Fragment>
          <h2 className="page-title">Orders</h2>
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
                    <td>
                      {order.createdAt.substring(0, 10).replaceAll("-", ".")}
                    </td>
                    <td>{order.user.name}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isDelivered ? (
                        <i
                          className="fas fa-check"
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
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
          <Pagination
            totalPage={totalPage}
            currentPage={currentPage}
            admin={"orders"}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default AdminOrders;
