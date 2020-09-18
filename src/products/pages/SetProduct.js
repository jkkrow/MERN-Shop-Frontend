import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

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

const SetProduct = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [fetchedProduct, setFetchedProduct] = useState();
  const [editMode, setEditMode] = useState();
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
  const history = useHistory();
  const { productId } = useParams();

  useEffect(() => {
    // edit mode
    if (productId) {
      setEditMode(true);
      const fetchProduct = async () => {
        const response = await sendRequest(
          `http://localhost:5000/api/user/${productId}`
        );
        const product = response.data.product;
        console.log(product);

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
      };
      fetchProduct();
    } else {
      setFetchedProduct({});
    }
  }, [productId, sendRequest, setFormData]);

  const createProductHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("price", formState.inputs.price.value);
      formData.append("category", formState.inputs.category.value);
      for (const image of formState.inputs.images.value) {
        formData.append("images", image);
      }
      formData.append("description", formState.inputs.description.value);

      await sendRequest(
        "http://localhost:5000/api/seller/add-product",
        "post",
        formData,
        { Authorization: "Bearer " + auth.token }
      );
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {fetchedProduct && (
        <form className="set-product" onSubmit={createProductHandler}>
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
              options={["computer", "book"]}
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
          </div>
          <div className="set-product__section-2">
            <ImageUpload
              id="images"
              type="product"
              label="Product Images"
              onInput={inputHandler}
              initialValue={fetchedProduct.images}
            />
            <Button
              type="submit"
              disabled={!formState.isValid}
              loading={isLoading}
            >
              {editMode ? "Edit" : "Add"} Product
            </Button>
          </div>
          <p onClick={() => console.log(formState)}>test</p>
        </form>
      )}
    </React.Fragment>
  );
};

export default SetProduct;
