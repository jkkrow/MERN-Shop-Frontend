import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = () => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink exact to="/">
          Products
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
