import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UI/Modal";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { VALIDATOR_EQUAL } from "../../shared/util/validators";
import "./AdminProducts.css";

const AdminProducts = () => {
  const auth = useContext(AuthContext);
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [targetProduct, setTargetProduct] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { isLoading, sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      product: { value: "", isValid: false },
    },
    false
  );

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await sendRequest(
        "http://localhost:5000/api/admin/products",
        "get",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      setFetchedProducts(response.data.products);
    };
    fetchProducts();
  }, [sendRequest, auth.token]);

  const openWarninigHandler = (userId) => {
    const selectedUser = fetchedProducts.find((user) => user._id === userId);
    setTargetProduct(selectedUser);
    setShowConfirmModal(true);
  };

  const closeWarningHandler = () => {
    setTargetProduct({});
    setShowConfirmModal(false);
  };

  const deleteProductHandler = async () => {
    setDeleteLoading(true);
    await axios({
      url: `http://localhost:5000/api/admin/delete-product/${targetProduct._id}`,
      method: "delete",
      headers: { Authorization: "Bearer " + auth.token },
    });
    setFetchedProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== targetProduct._id)
    );
    setDeleteLoading(false);
    closeWarningHandler();
  };

  return (
    <div className="admin-products">
      {isLoading && <LoadingSpinner overlay />}
      <Modal
        show={showConfirmModal}
        onCancel={closeWarningHandler}
        header="Delete Product"
        footer={
          <React.Fragment>
            <Button onClick={closeWarningHandler}>Cancel</Button>
            <Button
              danger
              onClick={deleteProductHandler}
              loading={deleteLoading}
              disabled={!formState.isValid}
            >
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>
          To proceed type the product name{" "}
          <strong>{targetProduct.title}</strong>.
        </p>
        <Input
          id="product"
          type="text"
          validators={[VALIDATOR_EQUAL(targetProduct.title)]}
          onInput={inputHandler}
        />
      </Modal>
      <div className="admin-products__header">
        <h1>Products</h1>
        <Button to="/new-product">
          <i className="fas fa-plus"></i> Create Product
        </Button>
      </div>
      <div className="admin-products__table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fetchedProducts.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>
                  <Link to={`/detail/${product._id}`}>{product.title}</Link>
                </td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>
                  <div className="admin-products__table__button">
                    <Button to={`/edit-product/${product._id}`}>
                      <i className="fas fa-edit"></i>
                    </Button>
                    <Button
                      danger
                      onClick={() => openWarninigHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
