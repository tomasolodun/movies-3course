import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AppContext";
import { Link, useHistory } from "react-router-dom";
import logo from "./img/logo.png";

export default function Header() {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-black sticky-top">
        <div className="container-fluid ">
          {error && <Alert variant="danger">{error}</Alert>}
          <Link to="/profile" className="btn btn-outline-success ">
            Profile
          </Link>
          <Link to="/dashboard" className="logo">
            <div>
              <img src={logo} />
            </div>
          </Link>
          <Link
            to="/login"
            className="btn btn-outline-success"
            onClick={handleLogout}
          >
            Log Out
          </Link>
        </div>
      </nav>
    </>
  );
}
