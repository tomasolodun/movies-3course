import React, { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import Button from "@restart/ui/esm/Button";
import { useAuth } from "../../contexts/AppContext";
import { db } from "../../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import no_image from "./img/no_image.png";

const User = ({image, email }) => {
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
      setIsLiked(user.friends.includes(email));
      // console.log(db.collection('users'))
      
    }
    initIsLiked();
  }, [email]);

  const handleLikeClick = async () => {
    const userRef = doc(db, "users", currentUser.email);
    
    let user = (await getDoc(userRef)).data();
    console.log(user)
    let friends = user.friends;
    if (friends.includes(email)) {
      friends.splice(friends.indexOf(email), 1);
    } else {
      friends.push(email);
      
    }
    
    await updateDoc(userRef, {
      friends: friends,
    });
    setIsLiked(friends.includes(email));
    //console.log(friends)
  };
  
  return (
    <>
      {location.pathname == "/friends" && !isLiked ? null : (
        <div className="card m-2 p-3 col-sm-8 col-md-3 col-lg-2 light-text purple">
          <div className="card-img-top">
            <img src={image || no_image} alt="" />
          </div>
          <h5 className="card-title">{email}</h5>
          <Button
            className="btn btn-outline-success card-footer m-1 border-success"
            onClick={handleLikeClick}
            style={!isLiked ? activeStyle : null}
          >
            {isLiked ? "Not friend" : "Friend"}
          </Button>
        </div>
      )}
    </>
  );
};

export default User;
