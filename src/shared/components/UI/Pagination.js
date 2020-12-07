import React from "react";
import { NavLink } from "react-router-dom";

import "./Pagination.css";

const Pagination = (props) => {
  return (
    props.totalPage > 1 && (
      <div className="pagination">
        {[...Array(props.totalPage).keys()].map((p) => {
          const pageLink = (
            <NavLink
              key={p + 1}
              className="pagination__button"
              activeStyle={{backgroundColor: "white"}}
              to={
                props.keyword
                  ? `/products/search/${props.keyword}/page/${p + 1}`
                  : `/products/page/${p + 1}`
              }
            >
              {p + 1}
            </NavLink>
          );
          
          if (props.totalPage < 10) {
            return pageLink;
          } else {
            if (p < 3 || p >= props.totalPage - 3) {
              return pageLink;
            } else {
                return <div>...</div>
            }
          }
        })}
      </div>
    )
  );
};

export default Pagination;
