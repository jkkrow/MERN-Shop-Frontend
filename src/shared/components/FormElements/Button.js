import React from "react";
import { Link } from "react-router-dom";

import ButtonSpinner from "./ButtonSpinner";
import "./Button.css";

const Button = (props) => {
  if (props.href) {
    return (
      <a
        className={`button ${props.inverse && "button--inverse"} ${
          props.danger && "button--danger"
        }`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }

  if (props.to) {
    return (
      <Link
        className={`button ${props.inverse && "button--inverse"} ${
          props.danger && "button--danger"
        }`}
        to={props.to}
        exact={props.exact}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      className={`button ${props.inverse && "button--inverse"} ${
        props.danger && "button--danger"
      }`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled || props.loading}
      style={props.loading ? { position: "relative" } : { position: "static" }}
    >
      {props.children}
      {props.loading && <ButtonSpinner overlay />}
    </button>
  );
};

export default Button;
