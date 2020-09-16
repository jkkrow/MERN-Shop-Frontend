import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { AuthContext } from "../../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  const { pathname } = useLocation();

  return (
    <ul className="nav-links">
      <li>
        <NavLink exact to="/">
          Products
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink exact to="/">
            Cart
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink exact to="/new-product">
            Add Product
          </NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink
            to="/login"
            isActive={() => ["/login", "/signup"].includes(pathname)}
          >
            Log in
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
