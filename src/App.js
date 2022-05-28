import React from "react";
import Signup from "./components/SignUp/index";
import { AuthProvider } from "./contexts/AppContext";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./components/Dashboard/index";
import Login from "./components/LogIn/index";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./components/Forgotpassword/index";
import UpdateProfile from "./components/UpdateProfile/index";
import Profile from "./components/Profile/index";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./style/App.css";
import UserLiked from "./components/Profile/UserLiked";
import UserFriends from "./components/Profile/UserFriends";

export default function App() {
  return (
    <AuthProvider>
      <Switch>
        <Redirect exact from="/" to="/login" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/update-profile" component={UpdateProfile} />
        <PrivateRoute path="/friends" component={UserFriends} />
        <PrivateRoute path="/liked" component={UserLiked} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
      </Switch>
    </AuthProvider>
  );
}
