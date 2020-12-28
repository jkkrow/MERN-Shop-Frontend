import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../../context/auth-context";
import "./NavLinks.css";

const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink exact to="/">
          Products
        </NavLink>
      </li>
      {auth.isAdmin && (
        <li>
          <NavLink exact to="/new-product">
            Add Product
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
