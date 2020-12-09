import React from "react";

import Button from "../FormElements/Button";
import "./Pagination.css";

const Pagination = (props) => {
  const totalPage = Number(props.totalPage);
  const currentPage = Number(props.currentPage) || 1;

  let paginate;
  if (totalPage <= 5) {
    paginate = [...Array(totalPage).keys()].map((p) => (
      <Button
        key={p + 1}
        to={
          props.keyword
            ? `/products/search/${props.keyword}/page/${p + 1}`
            : `/products/page/${p + 1}`
        }
        inverse={currentPage !== p + 1}
      >
        {p + 1}
      </Button>
    ));
  } else {
    if (currentPage <= 3) {
      paginate = [...Array(5).keys()].map((p) => (
        <Button
          key={p + 1}
          to={
            props.keyword
              ? `/products/search/${props.keyword}/page/${p + 1}`
              : `/products/page/${p + 1}`
          }
          inverse={currentPage !== p + 1}
        >
          {p + 1}
        </Button>
      ));
    } else if (currentPage >= totalPage - 2) {
      paginate = [...Array(5).keys()].map((p) => (
        <Button
          key={totalPage - 4 + p}
          to={
            props.keyword
              ? `/products/search/${props.keyword}/page/${totalPage - 4 + p}`
              : `/products/page/${totalPage - 4 + p}`
          }
          inverse={currentPage !== totalPage - 4 + p}
        >
          {totalPage - 4 + p}
        </Button>
      ));
    } else {
      paginate = [...Array(5).keys()].map((p) => (
        <Button
          key={currentPage - 2 + p}
          to={
            props.keyword
              ? `/products/search/${props.keyword}/page/${currentPage - 2 + p}`
              : `/products/page/${currentPage - 2 + p}`
          }
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
            <Button
              to={
                props.keyword
                  ? `/products/search/${props.keyword}/page/${1}`
                  : `/products/page/${1}`
              }
              inverse
            >
              <i className="fas fa-angle-double-left"></i>
            </Button>
            <Button
              to={
                props.keyword
                  ? `/products/search/${props.keyword}/page/${currentPage - 1}`
                  : `/products/page/${currentPage - 1}`
              }
              inverse
            >
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
            <Button
              to={
                props.keyword
                  ? `/products/search/${props.keyword}/page/${currentPage + 1}`
                  : `/products/page/${currentPage + 1}`
              }
              inverse
            >
              <i className="fas fa-angle-right"></i>
            </Button>
            <Button
              to={
                props.keyword
                  ? `/products/search/${props.keyword}/page/${totalPage}`
                  : `/products/page/${totalPage}`
              }
              inverse
            >
              <i className="fas fa-angle-double-right"></i>
            </Button>
          </React.Fragment>
        )}
      </div>
    )
  );
};

export default Pagination;
