import React from "react";
import { NavLink } from "react-router-dom";

import "./Logo.css";

const Logo = (props) => (
  <NavLink to="/" className="logo">
    MERN SHOP
  </NavLink>
);

export default Logo;
