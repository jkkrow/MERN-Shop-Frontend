import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import "./SearchBar.css";

const SearchBar = (props) => {
  const [searchBarOpened, setSearchBarOpened] = useState(false);
  const [keyword, setKeyword] = useState("");
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/search/${keyword}`);
      setSearchBarOpened(false);
    } else {
      history.push("/");
    }
  };

  const searchBar = (
    <React.Fragment>
      <button type="submit">
        <i className="fas fa-search"></i>
      </button>
      <input
        placeholder="Search Products"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </React.Fragment>
  );

  return (
    <div className="searchbar">
      <form onSubmit={submitHandler}>{searchBar}</form>
      <button
        className="searchbar-toggle"
        onClick={() => setSearchBarOpened(true)}
      >
        <i className="fas fa-search"></i>
      </button>

      <CSSTransition
        in={searchBarOpened}
        classNames="fade-in"
        timeout={200}
        mountOnEnter
        unmountOnExit
      >
        <div className="searchbar__mobile">
          <form style={{ display: "block" }} onSubmit={submitHandler}>
            {searchBar}
          </form>
          <button
            className="searchbar__mobile-close"
            onClick={() => setSearchBarOpened(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </CSSTransition>
    </div>
  );
};

export default SearchBar;
