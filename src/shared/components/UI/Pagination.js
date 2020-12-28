import React from "react";

import Button from "../FormElements/Button";
import "./Pagination.css";

const Pagination = (props) => {
  const totalPage = Number(props.totalPage);
  const currentPage = Number(props.currentPage) || 1;
  const linkTo = (arg) => {
    switch (props.admin) {
      case "products":
        return `/admin-products/page/${arg}`;
      case "users":
        return `/admin-users/page/${arg}`
      case "orders":
        return `/admin-orders/page/${arg}`
      default:
        if (props.keyword) {
          return `/products/search/${props.keyword}/page/${arg}`;
        } else {
          return `/products/page/${arg}`;
        }
    }
  };
  let paginate;
  if (totalPage <= 5) {
    paginate = [...Array(totalPage).keys()].map((p) => (
      <Button key={p + 1} to={linkTo(p + 1)} inverse={currentPage !== p + 1}>
        {p + 1}
      </Button>
    ));
  } else {
    if (currentPage <= 3) {
      paginate = [...Array(5).keys()].map((p) => (
        <Button key={p + 1} to={linkTo(p + 1)} inverse={currentPage !== p + 1}>
          {p + 1}
        </Button>
      ));
    } else if (currentPage >= totalPage - 2) {
      paginate = [...Array(5).keys()].map((p) => (
        <Button
          key={totalPage - 4 + p}
          to={linkTo(totalPage - 4 + p)}
          inverse={currentPage !== totalPage - 4 + p}
        >
          {totalPage - 4 + p}
        </Button>
      ));
    } else {
      paginate = [...Array(5).keys()].map((p) => (
        <Button
          key={currentPage - 2 + p}
          to={linkTo(currentPage - 2 + p)}
          inverse={currentPage !== currentPage - 2 + p}
        >
          {currentPage - 2 + p}
        </Button>
      ));
    }
  }

  return (
    totalPage > 1 && (
      <div className="pagination">
        {currentPage === 1 ? (
          <React.Fragment>
            <Button inverse>
              <i className="fas fa-angle-double-left"></i>
            </Button>
            <Button inverse>
              <i className="fas fa-angle-left"></i>
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button to={linkTo(1)} inverse>
              <i className="fas fa-angle-double-left"></i>
            </Button>
            <Button to={linkTo(currentPage - 1)} inverse>
              <i className="fas fa-angle-left"></i>
            </Button>
          </React.Fragment>
        )}
        {paginate}
        {currentPage === totalPage ? (
          <React.Fragment>
            <Button inverse>
              <i className="fas fa-angle-right"></i>
            </Button>
            <Button inverse>
              <i className="fas fa-angle-double-right"></i>
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button to={linkTo(currentPage + 1)} inverse>
              <i className="fas fa-angle-right"></i>
            </Button>
            <Button to={linkTo(totalPage)} inverse>
              <i className="fas fa-angle-double-right"></i>
            </Button>
          </React.Fragment>
        )}
      </div>
    )
  );
};

export default Pagination;
