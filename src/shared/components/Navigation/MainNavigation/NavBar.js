import React, { useContext, useState } from "react";

import Drawer from "./Drawer";
import DrawerToggler from "../NavigationItems/DrawerToggler";
import Logo from "../NavigationItems/Logo";
// import SearchBar from "./NavigationItems/SearchBar";
import NavLinks from "../NavigationItems/NavLinks";
import CartNav from "../NavigationItems/CartNav";
import Profile from "../NavigationItems/Profile";
import { AuthContext } from "../../../context/auth-context";
import "./NavBar.css";

const NavBar = () => {
  const auth = useContext(AuthContext);

  const [showDrawer, setShowDrawer] = useState(false);

  const openDrawerHandler = () => setShowDrawer(true);
  const closeDrawerHandler = () => setShowDrawer(false);

  return (
    <React.Fragment>
      <Drawer show={showDrawer} onClick={closeDrawerHandler} />
      <div className="navbar">
        <DrawerToggler onClick={openDrawerHandler} />
        <Logo />
        <nav className="navbar__nav">
          <NavLinks />
        </nav>
        <CartNav />
        {auth.token && <Profile />}
        {/* <SearchBar /> */}
      </div>
    </React.Fragment>
  );
};

export default NavBar;
