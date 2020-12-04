import React, { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import Drawer from "./Drawer";
import DrawerToggle from "../NavigationItems/DrawerToggle";
import Logo from "../NavigationItems/Logo";
import SearchBar from "../NavigationItems/SearchBar";
import NavLinks from "../NavigationItems/NavLinks";
import CartNav from "../NavigationItems/CartNav";
import Avatar from "../NavigationItems/Avatar";
import { AuthContext } from "../../../context/auth-context";
import "./NavBar.css";

const NavBar = () => {
  const auth = useContext(AuthContext);
  const [showDrawer, setShowDrawer] = useState(false);
  const openDrawerHandler = () => setShowDrawer(true);
  const closeDrawerHandler = () => setShowDrawer(false);
  const { pathname } = useLocation();

  return (
    <React.Fragment>
      <Drawer show={showDrawer} onClick={closeDrawerHandler} />
      <div className="navbar">
        <DrawerToggle onClick={openDrawerHandler} />
        <Logo />
        <nav className="navbar-nav">
          <NavLinks />
        </nav>
        <SearchBar />
        <CartNav />
        {auth.token ? (
          <Avatar />
        ) : (
          <li className="navbar-nav__login">
            <NavLink
              to="/login"
              isActive={() => ["/login", "/signup"].includes(pathname)}
            >
              Log in
            </NavLink>
          </li>
        )}
      </div>
    </React.Fragment>
  );
};

export default NavBar;
