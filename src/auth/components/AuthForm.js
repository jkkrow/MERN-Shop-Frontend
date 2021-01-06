import React from "react";

import Card from "../../shared/components/UI/Card";
import "./AuthForm.css";

const AuthForm = (props) => {
  return (
    <Card className={`auth-form ${props.className}`}>{props.children}</Card>
  );
};

export default AuthForm;
