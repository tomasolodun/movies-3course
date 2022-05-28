import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function Filtering({
  allGenres,
  setSelectedGenres,
  selectedGenres,
  titleSearchValue,
  setTitleSearchValue,
}) {
  const activeStyle = {
    color: "black",
    background: "#ff5a41",
    borderColor: "black",
  };
  const [localTitleSearchValue, setLocalTitleSearchValue] =
    useState(titleSearchValue);
  const handleTitleSearchValueChange = (event) => {
    setLocalTitleSearchValue(event.target.value);
  };
  const handleSearchButtonClick = (e) => {
    e.preventDefault();
    setTitleSearchValue(localTitleSearchValue);
  };
  //console.log(allGenres);
  return (
    <>
      <nav>
        <Form className="d-flex container mt-2 mb-2">
          <input
            className="form-control me-2"
            type="text"
            placeholder="Search by title.."
            aria-label="Search"
            value={localTitleSearchValue}
            onChange={handleTitleSearchValueChange}
          />
          <Button
            className="btn btn-outline-success border-success light-text"
            onClick={handleSearchButtonClick}
          >
            Search
          </Button>
        </Form>

        <ul className="pagination flex-wrap m-0 justify-content-center bg-black">
          {allGenres.map((genre, index) => (
            <li key={index} className="m-1 dark-grey">
              <Button
                onClick={() =>
                  setSelectedGenres(() => {
                    let newSelectedGenres = [...selectedGenres];
                    if (newSelectedGenres.includes(genre)) {
                      newSelectedGenres.splice(
                        newSelectedGenres.indexOf(genre),
                        1
                      );
                      return newSelectedGenres;
                    }
                    newSelectedGenres.push(genre);
                    return newSelectedGenres;
                  })
                }
                className="btn btn-outline-success hover"
                style={selectedGenres.includes(genre) ? activeStyle : null}
              >
                {genre}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
