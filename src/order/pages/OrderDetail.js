import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./OrderDetail.css";

const OrderDetail = () => {
  const auth = useContext(AuthContext);
  const [fetchedOrder, setFetchedOrder] = useState();
  const { isLoading, sendRequest } = useHttpClient();
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

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner overlay />}
      {!isLoading && fetchedOrder && (
        <div className="order">
          <div className="order-section">
            <div className="order-section__menu">
              <h2>ID: {fetchedOrder._id}</h2>
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
                      : { color: "#dc3545" }
                  }
                >
                  {fetchedOrder.isDelivered ? "O" : "X"}
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
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default OrderDetail;
