import React from "react";
import User from "./User";
import { db } from "../../firebase";

export default function FriendsList({ email, image }) {
  //console.log(email.map())
  return (
    <div className="d-flex flex-wrap justify-content-center">
        <User
          userName={email}
          image={image}
          id={email}
        />
    </div>
  );
}
