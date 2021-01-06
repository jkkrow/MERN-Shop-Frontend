import React, { useState } from "react";

import AuthForm from "../components/AuthForm";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import AuthMessage from "../components/AuthMessage";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { VALIDATOR_EMAIL } from "../../shared/util/validators";
import "./ForgotPassword.css";

const ForgotPassword = (props) => {
  const [message, setMessage] = useState(null);
  const [formState, inputHandler] = useForm(
    {
      email: { value: "", isValid: false },
    },
    false
  );
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const resetHandler = async (event) => {
    event.preventDefault();
    clearError();
    setMessage(null);
    const response = await sendRequest(
      `${process.env.REACT_APP_SERVER_URL}/auth/send-recovery-email`,
      "post",
      { email: formState.inputs.email.value }
    );
    setMessage(response.data.message);
  };

  return (
    <AuthForm className="forgot-password">
      <h2 className="page-title">RESET PASSWORD</h2>
      <hr />
      <p className="forgot-password__description">Enter your email to receive a recovery link</p>
      <AuthMessage
        message={error || message}
        type={error ? "error" : "message"}
      />
      <form onSubmit={resetHandler}>
        <Input
          id="email"
          type="email"
          label="E-mail"
          validators={[VALIDATOR_EMAIL()]}
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid} loading={isLoading}>
          Send
        </Button>
      </form>
    </AuthForm>
  );
};

export default ForgotPassword;
