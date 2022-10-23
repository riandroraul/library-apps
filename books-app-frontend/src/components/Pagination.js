import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Pagination = ({ books, currentPage, perPage }) => {
  const [counter, setCounter] = useState(1);
  const [active, setActive] = useState(true);
  const totalPage = Math.ceil(books.length / perPage);

  console.log(totalPage);

  const previous = (event) => {
    event.preventDefault();
    if (counter <= 1) {
      setCounter(1);
      event.currentTarget.classList.toggle("disabled");
    }
    setCounter(counter - 1);
  };
  const next = (event) => {
    event.preventDefault();
    if (counter === totalPage) {
      event.currentTarget.classList.toggle("disabled");
      setCounter(totalPage);
    } else {
      // event.currentTarget.classList.toggle("disabled");
      setCounter(counter + 1);
    }
  };
  useEffect(() => {}, [counter, totalPage]);
  // console.log(books.length);
  return (
    <nav aria-label="...">
      <ul className="pagination justify-content-center">
        <li className="page-item" disable={active}>
          <Link
            className="page-link previous"
            to="#"
            tabIndex="-1"
            onClick={previous}
            // aria-disabled={active}
          >
            Previous
          </Link>
        </li>
        <li className="page-link">{counter}</li>
        <li className="page-link">/</li>
        <li className="page-link">{totalPage}</li>
        {/* <li className="page-item active" aria-current="page">
          <Link className="page-link" to="#">
            2
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" to="#">
            3
          </Link>
        </li> */}
        <li className="page-item">
          <Link className="page-link" to="#" onClick={next}>
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
