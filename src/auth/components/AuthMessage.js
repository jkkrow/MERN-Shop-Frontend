import React from "react";

import "./AuthMessage.css";

const AuthMessage = (props) =>
  props.message ? (
    <div
      className={`auth-message ${
        props.type === "error" ? "auth-message__error" : "auth-message__success"
      }`}
    >
      <p>{props.message}</p>
    </div>
  ) : null;

export default AuthMessage;
