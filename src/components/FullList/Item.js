import React, { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import Button from "@restart/ui/esm/Button";
import { useAuth } from "../../contexts/AppContext";
import { db } from "../../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import no_image from "./img/no_image.png";

const Item = ({ title, image, genres, id }) => {
  const { currentUser } = useAuth();
  const [isLiked, setIsLiked] = useState();
  const location = useLocation();

  const activeStyle = {
    color: "black",
    backgroundColor: "#ff5a41",
    borderColor: "black",
  };

  useEffect(() => {
    async function initIsLiked() {
      const userRef = doc(db, "users", currentUser.email);
      let user = (await getDoc(userRef)).data();
      setIsLiked(user.likes.includes(id));
    }
    initIsLiked();
  }, [id]);

  const handleLikeClick = async () => {
    const userRef = doc(db, "users", currentUser.email);
    let user = (await getDoc(userRef)).data();
    let likes = user.likes;
    if (likes.includes(id)) {
      likes.splice(likes.indexOf(id), 1);
    } else {
      likes.push(id);
    }
    await updateDoc(userRef, {
      likes: likes,
    });
    setIsLiked(likes.includes(id));
  };
  if (genres.length == 0 || genres == null) {
    genres = ["No genres"];
  }

  return (
    <>
      {location.pathname == "/liked" && !isLiked ? null : (
        <div className="card m-2 p-3 col-sm-8 col-md-3 col-lg-2 light-text purple">
          <div className="card-img-top">
            <img src={image || no_image} alt="" />
          </div>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <ul className="card-text">
              {genres.map((genre, index) => (
                <li key={index} className="card-text">
                  {genre}
                </li>
              ))}
            </ul>
          </div>

          <Button
            className="btn btn-outline-success card-footer m-1 border-success"
            onClick={handleLikeClick}
            style={!isLiked ? activeStyle : null}
          >
            {isLiked ? "UnLike" : "Like"}
          </Button>
        </div>
      )}
    </>
  );
};

export default Item;
