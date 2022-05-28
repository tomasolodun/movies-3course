import React, { useState } from "react";
import { useAuth } from "../../contexts/AppContext";
import Header from "../Header/index";
import FullList from "../FullList/FullList";
import Pagination from "../Pagination/Pagination";
import Filtering from "../Filtering/Filtering";

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const { movies, genres } = useAuth();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [titleSearchValue, setTitleSearchValue] = useState("");
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredItems = movies
    .filter(
      (movie) =>
        !selectedGenres ||
        !selectedGenres.length ||
        movie.genres.some((genre) => selectedGenres.includes(genre))
    )
    .filter(
      (movie) =>
        !titleSearchValue ||
        !titleSearchValue.length ||
        movie.title.includes(titleSearchValue)
    );
  // const currentFriends = 1;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //console.log(genres);
  return (
    <>
      <Header />
      <Filtering
        allGenres={genres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        titleSearchValue={titleSearchValue}
        setTitleSearchValue={setTitleSearchValue}
      />
      {/* <FullFriendsList friends={currentFriends} /> */}
      <FullList items={currentItems} />
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredItems.length}
        paginate={paginate}
      />
    </>
  );
}
