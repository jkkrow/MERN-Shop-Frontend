import React from "react";
import { GoogleLogin } from "react-google-login";
import GoogleButton from "react-google-button";

import "./GoogleLoginBtn.css";

const CLIENT_ID =
  "598411719533-1rbn88vspt17l1qac92h574tudrmon1v.apps.googleusercontent.com";

const GoogleLoginBtn = (props) => {
  const loginFailureHandler = (googleResponse) => {
    alert("Failed to login!");
  };

  return (
    <GoogleLogin
      clientId={CLIENT_ID}
      onSuccess={props.onClick}
      onFailure={loginFailureHandler}
      cookiePolicy={"single_host_origin"}
      render={(renderProps) => (
        <GoogleButton
          className="google-login-btn"
          onClick={renderProps.onClick}
          label="Log in with Google"
          type="light"
          style={{ borderRadius: "4px" , color: "#252525" }}
        />
      )}
    >
      Log in with Google
    </GoogleLogin>
  );
};

export default GoogleLoginBtn;
