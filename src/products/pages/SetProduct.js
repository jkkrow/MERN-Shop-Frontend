import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Select from "../../shared/components/FormElements/Select";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import "./SetProduct.css";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";

const SetProduct = ({ history }) => {
  const auth = useContext(AuthContext);
  const [fetchedProduct, setFetchedProduct] = useState();
  const [editMode, setEditMode] = useState();
  const [pageLoading, setPageloading] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: "", isValid: false },
      price: { value: "", isValid: false },
      category: { value: "", isValid: false },
      description: { value: "", isValid: false },
      images: { value: "", isValid: false },
    },
    false
  );
  const { productId } = useParams();

  useEffect(() => {
    if (productId) {
      // edit mode
      setEditMode(true);
      const fetchProduct = async () => {
        setPageloading(true);
        const response = await sendRequest(
          `http://localhost:5000/api/user/detail/${productId}`
        );
        const product = response.data.product;

        // populate form
        setFetchedProduct(product);
        setFormData(
          {
            title: { value: product.title, isValid: true },
            price: { value: product.price, isValid: true },
            category: { value: product.category, isValid: true },
            description: { value: product.description, isValid: true },
            images: { value: product.images, isValid: true },
          },
          true
        );
        setPageloading(false);
      };
      fetchProduct();
    } else {
      setFetchedProduct({});
    }
  }, [productId, sendRequest, setFormData]);

  const createProductHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("price", formState.inputs.price.value);
    formData.append("category", formState.inputs.category.value);
    for (const image of formState.inputs.images.value) {
      formData.append("images", image);
    }
    formData.append("description", formState.inputs.description.value);

    await sendRequest(
      "http://localhost:5000/api/admin/create-product",
      "post",
      formData,
      { Authorization: "Bearer " + auth.token }
    );
    history.push("/admin-products");
  };

  const updateProductHandler = async (event) => {
    event.preventDefault();
    await sendRequest(
      `http://localhost:5000/api/admin/update-product/${productId}`,
      "patch",
      {
        title: formState.inputs.title.value,
        price: formState.inputs.price.value,
        category: formState.inputs.category.value,
        description: formState.inputs.description.value,
      },
      { Authorization: "Bearer " + auth.token }
    );
    history.push("/admin-products");
  };

  return (
    <React.Fragment>
      {pageLoading && <LoadingSpinner overlay />}
      <ErrorModal error={error} onClear={clearError} />
      {fetchedProduct && (
        <form
          className="set-product"
          onSubmit={editMode ? updateProductHandler : createProductHandler}
        >
          <div className="set-product__section-1">
            <Input
              id="title"
              type="text"
              label="Product Title"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              initialValue={fetchedProduct.title}
              initialValid={!!fetchedProduct.title}
            />
            <Input
              id="price"
              type="number"
              label="Price"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              initialValue={fetchedProduct.price}
              initialValid={!!fetchedProduct.price}
            />
            <Select
              id="category"
              label="Category"
              options={["Computer", "Electronics"]}
              onSelect={inputHandler}
              initialValue={fetchedProduct.category}
              initialValid={!!fetchedProduct.category}
            />

            <Input
              element="textarea"
              id="description"
              rows="5"
              label="Description"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              initialValue={fetchedProduct.description}
              initialValid={!!fetchedProduct.description}
            />
            {editMode && (
              <Button
                type="submit"
                disabled={!formState.isValid}
                loading={isLoading}
              >
                Edit Product
              </Button>
            )}
          </div>
          {!editMode && (
            <div className="set-product__section-2">
              <ImageUpload
                id="images"
                type="product"
                label="Product Images"
                onInput={inputHandler}
              />
              <Button
                type="submit"
                disabled={!formState.isValid}
                loading={isLoading}
              >
                Create Product
              </Button>
            </div>
          )}
        </form>
      )}
    </React.Fragment>
  );
};

export default SetProduct;
