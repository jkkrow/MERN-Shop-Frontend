import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import AuthForm from "../components/AuthForm";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import "./ResetPassword.css";

const ResetPassword = ({ history }) => {
  const [userId, setUserId] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);
  const { isLoading, error, sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      password: { value: "", isValid: false },
    },
    false
  );
  const { token } = useParams();

  useEffect(() => {
    const loadPage = async () => {
      setPageLoading(true);
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_SERVER_URL}/auth/reset-password?resetPasswordToken=${token}`
        );
        setUserId(response.data.userId);
        setPageLoading(false);
      } catch (err) {
        setPageLoading(false);
      }
    };
    loadPage();
  }, [sendRequest, token]);

  const resetHandler = async (event) => {
    event.preventDefault();
    await sendRequest(
      `${process.env.REACT_APP_SERVER_URL}/auth/update-password`,
      "patch",
      { userId, password: formState.inputs.password.value }
    );
    history.push("/login");
  };

  return (
    <React.Fragment>
      {pageLoading && <LoadingSpinner overlay />}
      {error ? <p className="reset-password__error">{error}</p> : null}
      {userId && (
        <AuthForm className="reset-password">
          <h2 className="page-title">RESET PASSWORD</h2>
          <hr />
          <p className="reset-password__description">Enter a new password</p>
          <form onSubmit={resetHandler}>
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
              Submit
            </Button>
          </form>
        </AuthForm>
      )}
    </React.Fragment>
  );
};

export default ResetPassword;
