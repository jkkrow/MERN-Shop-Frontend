import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UI/Modal";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import Pagination from "../../shared/components/UI/Pagination";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { VALIDATOR_EQUAL } from "../../shared/util/validators";
import "./AdminProducts.css";

const AdminProducts = ({ match }) => {
  const auth = useContext(AuthContext);
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [totalPage, setTotalPage] = useState();
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
  const currentPage = match.params.currentPage || "";

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await sendRequest(
        `http://localhost:5000/api/admin/products?page=${currentPage}`,
        "get",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      setFetchedProducts(response.data.products);
      setTotalPage(response.data.pages);
    };
    fetchProducts();
  }, [auth, sendRequest, currentPage]);

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
            <Button
              danger
              onClick={deleteProductHandler}
              loading={deleteLoading}
              disabled={!formState.isValid}
            >
              Delete
            </Button>
            <Button onClick={closeWarningHandler}>Cancel</Button>
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
      <React.Fragment>
        <div className="admin-products__header">
          <h2 className="page-title">Products</h2>
          <Button to="/new-product">
            <i className="fas fa-plus"></i> Add Product
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
                <th>Stock</th>
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
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.category}</td>
                  <td>{product.quantity}</td>
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
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          admin={"products"}
        />
      </React.Fragment>
    </div>
  );
};

export default AdminProducts;
