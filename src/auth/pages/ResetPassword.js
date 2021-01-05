import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./ResetPassword.css";

const ResetPassword = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { token } = useParams();

  useEffect(() => {
    const loadPage = async () => {
      const response = await sendRequest(
        `${process.env.REACT_APP_SERVER_URL}/reset-password?resetPasswordToken=${token}`
      );
    };
    loadPage();
  }, [token]);

  return (
    <div className="reset-password">
      {isLoading && <LoadingSpinner overlay />}
      {error ? <p></p> : null}
    </div>
  );
};

export default ResetPassword;
