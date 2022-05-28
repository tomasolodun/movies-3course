import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AppContext";
import Header from "../Header/index";
import FullList from "../FullList/FullList";
import Pagination from "../Pagination/Pagination";
import Filtering from "../Filtering/Filtering";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import FriendsList from "../FriendsList/FriendsList";

export default function UserLiked() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const { currentUser } = useAuth();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [titleSearchValue, setTitleSearchValue] = useState("");
  const [friends, setFriends] = useState();
  useEffect(() => {
    async function initLikes(friends) {
      const userRef = doc(db, "users", currentUser.email);
      let user = (await getDoc(userRef)).data();
      setFriends(user.friends);
      friends = user.friends;
      console.log(friends)
    }
    initLikes();
  }, []);
  console.log(friends)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return (
    <>
      <Header />
      {friends && friends.length && (
        <>
          <FriendsList items={friends} />
          
        </>
      )}
    </>
  );
}
