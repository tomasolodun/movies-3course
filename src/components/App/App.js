import React from "react";
import Signup from "../SignUp/index";
import { AuthProvider } from "../contexts/AppContext";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "../Dashboard/index";
import FullFriendsList from "./FullFriendsList";
import Login from "../LogIn/index";
import PrivateRoute from "../../PrivateRoute";
import ForgotPassword from "../Forgotpassword/index";
import UpdateProfile from "../UpdateProfile/index";
import Profile from "../Profile/index";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../style/App.css";
import UserLiked from "../Profile/UserLiked";
import UserFriends from "../Profile/UserFriends";

export default function App() {
  return (
    <AuthProvider>
      <Switch>
        <Redirect exact from="/" to="/login" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/update-profile" component={UpdateProfile} />
        {/* <PrivateRoute path="/friendsList" component={FullFriendsList} />*/}
        <PrivateRoute path="/friends" component={UserFriends} /> 
        <PrivateRoute path="/liked" component={UserLiked} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
      </Switch>
    </AuthProvider>
  );
}
