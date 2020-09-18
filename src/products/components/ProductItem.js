import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UI/Modal";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./ProductItem.css";

const ProductItem = (props) => {
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const location = useLocation();

  const openWarningHandler = () => setShowConfirmModal(true);
  const closeWarningHandler = () => setShowConfirmModal(false);

  const deleteProductHandler = async () => {
    await sendRequest(
      `http://localhost:5000/api/seller/${props.id}`,
      "delete",
      null,
      { Authorization: "Bearer " + auth.token }
    );
    props.onDelete(props.id);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={closeWarningHandler}
        header="Are your sure?"
        footer={
          <React.Fragment>
            <Button inverse onClick={closeWarningHandler}>
              Cancel
            </Button>
            <Button danger onClick={deleteProductHandler} loading={isLoading}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to proceed and delete this product?</p>
      </Modal>
      <li className="product-item">
        <div className="product-item__image">
          <Link to={`/detail/${props.id}`}>
            <img src={props.images[0]} alt={props.title} />
          </Link>
        </div>
        <div className="product-item__info">
          <Link to={`/detail/${props.id}`}>
            <h2>{props.title}</h2>
            <h3>${props.price}</h3>
          </Link>
          {auth.userId === props.seller &&
            location.pathname === "/my-products" && (
              <div className="product-item__action">
                <Button to={`/edit-product/${props.id}`}>
                  Edit Product
                </Button>
                <Button danger onClick={openWarningHandler}>
                  Delete Product
                </Button>
              </div>
            )}
        </div>
      </li>
    </React.Fragment>
  );
};

export default ProductItem;
