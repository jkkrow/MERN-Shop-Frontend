import React, { useState, useContext, useEffect } from "react";

import Card from "../../shared/components/UI/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_LENGTH,
} from "../../shared/util/validators";
import "./AddressForm.css";

const AddressForm = (props) => {
  const auth = useContext(AuthContext);
  const [initialFormData, setInitialFormData] = useState();
  const [editMode, setEditMode] = useState(false);
  const [formState, inputHandler, setFormData] = useForm({
    address: { value: "", isValid: false },
    city: { value: "", isValid: false },
    postalCode: { value: "", isValid: false },
    country: { value: "", isValid: false },
  });
  const { isLoading, sendRequest } = useHttpClient();

  const { initialData } = props;
  useEffect(() => {
    if (initialData) {
      // editMode
      setEditMode(true);
      setInitialFormData(initialData);
      setFormData(
        {
          address: { value: initialData.address, isValid: true },
          city: { value: initialData.city, isValid: true },
          postalCode: { value: initialData.postalCode, isValid: true },
          country: { value: initialData.country, isValid: true },
        },
        true
      );
    } else {
      setInitialFormData({});
    }
  }, [initialData, setFormData]);

  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await sendRequest(
      editMode
        ? `http://localhost:5000/api/user/edit-address/${initialData._id}`
        : "http://localhost:5000/api/user/add-address",
      editMode ? "patch" : "post",
      {
        address: formState.inputs.address.value,
        city: formState.inputs.city.value,
        postalCode: formState.inputs.postalCode.value,
        country: formState.inputs.country.value,
      },
      {
        Authorization: "Bearer " + auth.token,
      }
    );
    props.onSave(response.data.addresses);
  };

  return (
    <React.Fragment>
      {initialFormData && (
        <Card className="address-form">
          <form>
            <h2>New Address</h2>
            <Input
              id="address"
              type="text"
              label="Address"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              initialValue={initialFormData.address}
              initialValid={!!initialFormData.address}
            />
            <Input
              id="city"
              type="text"
              label="City"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              initialValue={initialFormData.city}
              initialValid={!!initialFormData.city}
            />
            <Input
              id="postalCode"
              type="number"
              label="Postal Code"
              validators={[VALIDATOR_LENGTH(5)]}
              onInput={inputHandler}
              initialValue={initialFormData.postalCode}
              initialValid={!!initialFormData.postalCode}
            />
            <Input
              id="country"
              type="text"
              label="Country"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              initialValue={initialFormData.country}
              initialValid={!!initialFormData.country}
            />
            <Button
              type="submit"
              onClick={submitHandler}
              disabled={!formState.isValid}
              loading={isLoading}
            >
              Save
            </Button>
          </form>
        </Card>
      )}
    </React.Fragment>
  );
};

export default AddressForm;
