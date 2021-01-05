import React from "react";
import { NavLink } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UI/Card";
import ValidationError from "../components/AuthMessage";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import "./Signup.css";

const Signup = ({ history, location }) => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: { value: "", isValid: false },
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );
  const redirect = location && location.search.split("=")[1];

  const signupHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, "post", {
        name: formState.inputs.name.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      });
      history.push(redirect ? `/login?redirect=${redirect}` : `/login`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="signup">
      <div>
        <h2 className="signup__header page-title">SIGNUP</h2>
        <hr />
        {error && <ValidationError message={error} />}
        <form onSubmit={signupHandler}>
          <Input
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
          <Input
            id="email"
            type="email"
            label="E-mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText={"Please enter a valid email address."}
            onInput={inputHandler}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="At least 7 characters"
            validators={[VALIDATOR_MINLENGTH(7)]}
            errorText="Please enter a valid password."
            onInput={inputHandler}
          />
          <Button
            type="submit"
            disabled={!formState.isValid}
            loading={isLoading}
          >
            Sign Up
          </Button>
          <p>
            Already have an account?{" "}
            <NavLink
              to={redirect ? `/login?redirect=${redirect}` : `/login`}
              style={{ color: "#0094f7" }}
            >
              Log in
            </NavLink>
          </p>
        </form>
      </div>
    </Card>
  );
};

export default Signup;
