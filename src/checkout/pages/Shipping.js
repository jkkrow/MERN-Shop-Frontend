import React from "react";

import Card from "../../shared/components/UI/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import CheckoutSteps from "../components/CheckoutSteps";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_LENGTH,
} from "../../shared/util/validators";
import "./Shipping.css";

const Shipping = ({ history }) => {
  const [formState, inputHandler] = useForm({
    address: { value: "", isValid: false },
    city: { value: "", isValid: false },
    postalCode: { value: "", isValid: false },
    country: { value: "", isValid: false },
  });

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log("submit");
  };

  return (
    <React.Fragment>
      <CheckoutSteps step2 />
      <Card className="shipping">
        <form>
          <h2>Shipping</h2>
          <Input
            id="address"
            type="text"
            label="Address"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <Input
            id="city"
            type="text"
            label="City"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <Input
            id="postalCode"
            type="number"
            label="Postal Code"
            validators={[VALIDATOR_LENGTH(5)]}
            onInput={inputHandler}
          />
          <Input
            id="country"
            type="text"
            label="Country"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <Button
            type="submit"
            onClick={submitHandler}
            disabled={!formState.isValid}
          >
            Continue
          </Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default Shipping;
