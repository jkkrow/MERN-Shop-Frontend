import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./OrderDetail.css";

const OrderDetail = () => {
  const auth = useContext(AuthContext);
  const [fetchedOrder, setFetchedOrder] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { orderId } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await sendRequest(
        `http://localhost:5000/api/user/order-detail/${orderId}`,
        "get",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      setFetchedOrder(response.data.order);
    };
    fetchOrder();
  }, [auth, sendRequest, orderId]);

  const deliveredHandler = async () => {
    setButtonLoading(true);
    const response = await axios({
      url: `http://localhost:5000/api/admin/update-delivered/${orderId}`,
      method: "patch",
      headers: { Authorization: "Bearer " + auth.token },
    });
    setFetchedOrder(response.data.order);
    setButtonLoading(false);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner overlay />}
      {!isLoading && fetchedOrder && (
        <div className="order">
          <div className="order-section">
            <div className="order-section__menu">
              <h2>
                Date:{" "}
                {fetchedOrder.createdAt.substring(0, 10).replaceAll("-", ".")}
              </h2>
              <p>Order ID: {fetchedOrder._id}</p>
            </div>
            <div className="order-section__menu">
              <h2>Shipping</h2>
              <p>{`${fetchedOrder.shippingAddress.address}, ${fetchedOrder.shippingAddress.city}, ${fetchedOrder.shippingAddress.postalCode}, ${fetchedOrder.shippingAddress.country}`}</p>
              <p>
                <span>Delievered: </span>
                <span
                  style={
                    fetchedOrder.isDelivered
                      ? { color: "#269e42" }
                      : { color: "red" }
                  }
                >
                  {fetchedOrder.isDelivered
                    ? fetchedOrder.deliveredAt
                        .substring(0, 10)
                        .replaceAll("-", ".")
                    : "Not Yet"}
                </span>
              </p>
            </div>
            <div className="order-section__menu">
              <h2>Payment</h2>
              <p>Method: {fetchedOrder.payment.method}</p>
              <p>
                Status:{" "}
                <span style={{ color: "#269e42" }}>
                  {fetchedOrder.payment.status}
                </span>
              </p>
              <p>E-mail: {fetchedOrder.payment.email_address}</p>
            </div>
            <div className="order-section__menu">
              <h2>Order Items</h2>
              {fetchedOrder.orderItems.map((item) => (
                <Link
                  className="order-section__item"
                  key={item._id}
                  to={`/detail/${item.product}`}
                >
                  <img src={item.image} alt={item.title} />
                  <p>{item.title}</p>
                  <p>{`${item.quantity} x $${item.price} = $${(
                    item.quantity * item.price
                  ).toFixed(2)}`}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="order-section">
            <h2>Order Summary</h2>
            <div className="order-section__item">
              <p>Items</p>
              <p>${fetchedOrder.itemsPrice.toFixed(2)}</p>
            </div>
            <div className="order-section__item">
              <p>Shipping</p>
              <p>${fetchedOrder.shippingPrice.toFixed(2)}</p>
            </div>
            <div className="order-section__item">
              <p>Tax</p>
              <p>${fetchedOrder.tax.toFixed(2)}</p>
            </div>
            <div className="order-section__item">
              <p>Total</p>
              <p>${fetchedOrder.totalPrice.toFixed(2)}</p>
            </div>
            {auth.isAdmin && (
              <Button
                onClick={deliveredHandler}
                disabled={fetchedOrder.isDelivered}
                loading={buttonLoading}
              >
                {!fetchedOrder.isDelivered
                  ? "Update as Delivered"
                  : "Delivered"}
              </Button>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default OrderDetail;
