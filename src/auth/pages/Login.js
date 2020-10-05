import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UI/Card";
import ValidationError from "../components/ValidationError";
import GoogleLoginBtn from "../components/GoogleLoginBtn";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import "./Login.css";

const Login = ({ history, location }) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );

  const redirect = location && location.search.split("=")[1];

  const loginHandler = async (event) => {
    event.preventDefault();

    const response = await sendRequest(
      "http://localhost:5000/api/auth/login",
      "post",
      {
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      }
    );
    auth.login(
      response.data.token,
      response.data.userData.userId,
      response.data.userData.image
    );

    redirect && history.push(redirect);
  };

  const googleLoginHandler = async (googleResponse) => {
    const response = await sendRequest(
      "http://localhost:5000/api/auth/google-login",
      "post",
      {
        tokenId: googleResponse.tokenId,
      }
    );
    auth.login(
      response.data.token,
      response.data.userData.userId,
      response.data.userData.image
    );

    redirect && history.push(redirect);
  };

  return (
    <React.Fragment>
      <Card className="login">
        <h2 className="login__header">Log in</h2>
        <hr />
        {error && <ValidationError message={error} />}
        <form onSubmit={loginHandler}>
          <Input
            id="email"
            type="email"
            label="E-mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(7)]}
            errorText="Please enter a valid password."
            onInput={inputHandler}
          />
          <Button
            type="submit"
            disabled={!formState.isValid}
            loading={isLoading}
          >
            Log in
          </Button>
        </form>
        <p>
          Don't have an account?{" "}
          <NavLink
            to={redirect ? `/signup?redirect=${redirect}` : `/signup`}
            style={{ color: "#0094f7" }}
          >
            Sign up
          </NavLink>
        </p>
        <GoogleLoginBtn onClick={googleLoginHandler} />
      </Card>
    </React.Fragment>
  );
};

export default Login;
