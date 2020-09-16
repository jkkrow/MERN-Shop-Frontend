import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Select from "../../shared/components/FormElements/Select";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import "./SetProduct.css";

const SetProduct = (props) => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: { value: "", isValid: false },
      price: { value: "", isValid: false },
      category: { value: "", isValid: false },
      images: { value: "", isValid: false },
      description: { value: "", isValid: false },
    },
    false
  );

  const history = useHistory();

  const createProductHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs.images.value);
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
      {isLoading && <LoadingSpinner overlay />}
      <ErrorModal error={error} onClear={clearError} />
      <form className="set-product" onSubmit={createProductHandler}>
        <div className="set-product__section-1">
          <Input
            id="title"
            type="text"
            label="Product Title"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <Input
            id="price"
            type="number"
            label="Price"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <Select
            id="category"
            label="Category"
            options={["computer", "book"]}
            onSelect={inputHandler}
          />

          <Input
            element="textarea"
            id="description"
            rows="5"
            label="Description"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
        </div>
        <div className="set-product__section-2">
          <ImageUpload
            id="images"
            type="product"
            label="Product Images"
            onInput={inputHandler}
          />
          <Button
            type="submit"
            disabled={!formState.isValid || isLoading}
          >
            Add Product
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default SetProduct;
