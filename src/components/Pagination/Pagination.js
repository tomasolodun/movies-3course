import React from "react";
import { Button } from "react-bootstrap";
import { BsSkipForwardFill, BsSkipBackwardFill } from "react-icons/bs";

const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  setItemsPerPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const rangeForPages = 2;
  let pageNumbersToDisplay = [];
  for (
    let i = currentPage - rangeForPages;
    i <= currentPage + rangeForPages;
    i++
  ) {
    if (i > 0 && i <= pageNumbers.length) {
      pageNumbersToDisplay.push(i);
    }
  }
  const activeStyle = {
    color: "black",
    background: "#ff5a41",
    borderColor: "black",
  };
  return (
    <nav>
      <ul className="pagination flex-wrap m-0 justify-content-center bg-black">
        <li className="m-1 dark-grey">
          <Button
            disabled={currentPage == 1}
            onClick={() => paginate(1)}
            className="btn btn-outline-success hover"
          >
            <BsSkipBackwardFill />
          </Button>
        </li>
        {pageNumbersToDisplay.map((number) => (
          <li key={number} className="m-1 dark-grey">
            <Button
              onClick={() => paginate(number)}
              className="btn btn-outline-success hover"
              style={currentPage == number ? activeStyle : null}
            >
              {number}
            </Button>
          </li>
        ))}
        <li className="m-1 dark-grey">
          <Button
            disabled={currentPage == pageNumbers.length}
            onClick={() => paginate(pageNumbers.length)}
            className="btn btn-outline-success hover"
          >
            <BsSkipForwardFill />
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
