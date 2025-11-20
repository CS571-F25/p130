import { useState } from "react";
import { Container, Button, Form, Row, Col, Alert } from "react-bootstrap";

export default function Auth({ currentUser, onSignIn, onSignOut }) {
  const [name, setName] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onSignIn?.(trimmed);
    setName("");
  };

  return (
    <Container className="page">
      <h2>Sign In / Create Account</h2>

      {currentUser ? (
        <>
          <Alert variant="success">
            You are signed in as <strong>{currentUser}</strong>.
          </Alert>
          <Button variant="outline-danger" onClick={onSignOut}>
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <p className="text-muted">
            Enter a display name to sign in. This name will appear on your
            reviews.
          </p>
          <Form onSubmit={handleSignIn}>
            <Row className="g-2 align-items-end">
              <Col sm={8} md={6}>
                <Form.Label>Display name</Form.Label>
                <Form.Control
                  placeholder="e.g., badger-foodie"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
              <Col sm="auto">
                <Button type="submit">Sign In</Button>
              </Col>
            </Row>
          </Form>
        </>
      )}
    </Container>
  );
}
