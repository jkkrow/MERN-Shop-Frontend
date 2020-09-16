import React, { useContext } from "react";

import defaultImage from "../../../assets/images/default-profile.png";
import { AuthContext } from "../../context/auth-context";
import "./Avatar.css";

const Avatar = (props) => {
  const auth = useContext(AuthContext);

  return (
    <div
      className={`avatar ${props.className}`}
      style={props.style}
      onClick={props.onClick}
    >
      <img
        src={auth.image || defaultImage}
        alt={props.alt}
        style={{ width: props.width, height: props.height }}
      />
    </div>
  );
};

export default Avatar;
