import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AppContext";
import { Link, useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const buttonStyle = {
    backgroundColor: "#6f4849",
    borderColor: "#6f4849",
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/dashboard");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center light-text"
      style={{ minHeight: "70vh" }}
    >
      <div className="col-sm-6 col-md-5 col-lg-4 ">
        <Card>
          <Card.Body className="dark-grey p-4">
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button
                disabled={loading}
                className="w-100 mt-2"
                type="submit"
                style={buttonStyle}
              >
                Log In
              </Button>
            </Form>
            <div className="w-100 text-center mt-3 ">
              <Link to="/forgot-password" className="green">
                Forgot Password?
              </Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account?{" "}
          <Link to="/signup" className="green">
            Sign Up
          </Link>
        </div>
      </div>
    </Container>
  );
}
