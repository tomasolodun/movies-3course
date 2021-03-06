import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AppContext";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const buttonStyle = {
    backgroundColor: "#6f4849",
    borderColor: "#6f4849",
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center light-text"
      style={{ minHeight: "70vh" }}
    >
      <div className="col-sm-6 col-md-5 col-lg-4">
        <Card>
          <Card.Body className="dark-grey p-4">
            <h2 className="text-center mb-4">Password Reset</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Button
                disabled={loading}
                className="w-100 mt-2"
                type="submit"
                style={buttonStyle}
              >
                Reset Password
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/login" className="green">
                Login
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
