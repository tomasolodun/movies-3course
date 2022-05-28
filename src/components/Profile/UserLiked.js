import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AppContext";
import Header from "../Header/index";
import FullList from "../FullList/FullList";
import Pagination from "../Pagination/Pagination";
import Filtering from "../Filtering/Filtering";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function UserLiked() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const { movies, genres, currentUser } = useAuth();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [titleSearchValue, setTitleSearchValue] = useState("");
  const [likes, setLikes] = useState();
  useEffect(() => {
    async function initLikes() {
      const userRef = doc(db, "users", currentUser.email);
      let user = (await getDoc(userRef)).data();
      setLikes(user.likes);
    }
    initLikes();
  }, []);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredItems = movies
    .filter((movie) => !likes || likes.includes(movie.id))
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

  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <Header />
      {likes && likes.length && (
        <>
          <Filtering
            allGenres={genres}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            titleSearchValue={titleSearchValue}
            setTitleSearchValue={setTitleSearchValue}
          />
          <FullList items={currentItems} />
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredItems.length}
            paginate={paginate}
          />
        </>
      )}
    </>
  );
}
