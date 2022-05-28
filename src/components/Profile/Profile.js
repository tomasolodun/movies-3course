import React from "react";
import Header from "../Header/index";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AppContext";
import rest from "./img/rest.png";
import FriendsList from "../FriendsList/FriendsList";

export default function Profile() {
  const { currentUser } = useAuth();
  return (
    <>
      <Header />
      <div className="d-flex flex-wrap justify-content-center">
        <Link to="/liked" className="btn btn-outline-success m-2">
          Liked
        </Link>
        <Link to="/friends" className="btn btn-outline-success m-2">
          Friends
        </Link>
        {/* <Link to="/friends" className="btn btn-outline-success m-2">Friends</Link> */}
        <Link to="/update-profile" className="btn btn-outline-success m-2">
          Update Profile
        </Link>
      </div>
      <div className="light-text h2 text-center">Hi, {currentUser.email}</div>
      <div className="light-text h1 text-center">May be you know them?</div>
      <FriendsList/>
    </>
  );
}
