import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UI/Modal";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./ProductItem.css";

const ProductItem = (props) => {
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openWarningHandler = () => setShowConfirmModal(true);
  const closeWarningHandler = () => setShowConfirmModal(false);

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        onCancel={closeWarningHandler}
        header="Are your sure?"
      >
        <p></p>
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
          {auth.userId === props.seller.toString() && (
            <div className="product-item__action">
              <Button>Edit Product</Button>
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
