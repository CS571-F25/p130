import { useState } from "react";
import { Container, Button, Form, Row, Col, Alert } from "react-bootstrap";

const ACCOUNTS_KEY = "uwDiningAccounts";

function loadAccounts() {
  try {
    const raw = window.localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveAccounts(accounts) {
  try {
    window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch {
    // ignore
  }
}

export default function Auth({ currentUser, onSignIn, onSignOut }) {
  const [mode, setMode] = useState("signin"); // 'signin' or 'create'
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState(null); // {variant, text}

  const handleSubmit = (e) => {
    e.preventDefault();
    const n = name.trim();
    const p = pin.trim();

    if (!n || !p) {
      setMessage({ variant: "danger", text: "Please enter a name and PIN." });
      return;
    }

    const accounts = loadAccounts();

    if (mode === "signin") {
      // 1) Check if account exists FIRST
      if (!accounts[n]) {
        setMessage({
          variant: "danger",
          text: "No account found with that name."
        });
        return;
      }

      // 2) Then validate PIN length
      if (p.length < 4 || p.length > 6) {
        setMessage({
          variant: "danger",
          text: "PIN must be between 4 and 6 characters long."
        });
        return;
      }

      // 3) Then validate PIN value
      if (accounts[n] !== p) {
        setMessage({
          variant: "danger",
          text: "Incorrect PIN."
        });
        return;
      }

      onSignIn?.(n);
      setMessage({
        variant: "success",
        text: `Signed in as ${n}.`
      });
      setName("");
      setPin("");
    } else {
      // CREATE ACCOUNT MODE

      if (p.length < 4 || p.length > 6) {
        setMessage({
          variant: "danger",
          text: "PIN must be between 4 and 6 characters long."
        });
        return;
      }

      if (accounts[n]) {
        setMessage({
          variant: "danger",
          text: "An account with that name already exists."
        });
        return;
      }

      accounts[n] = p;
      saveAccounts(accounts);
      onSignIn?.(n);
      setMessage({
        variant: "success",
        text: `Account created and signed in as ${n}.`
      });
      setName("");
      setPin("");
    }
  };

  const showForm = !currentUser; // hide form if already signed in

  return (
    <Container className="page">
      <h2>Sign In / Create Account</h2>

      {currentUser && (
        <Alert variant="success">
          You are currently signed in as <strong>{currentUser}</strong>.
        </Alert>
      )}

      {message && (
        <Alert
          variant={message.variant}
          onClose={() => setMessage(null)}
          dismissible
        >
          {message.text}
        </Alert>
      )}

      {showForm && (
        <Form onSubmit={handleSubmit}>
          <Row className="g-2 mb-3">
            <Col sm={6} md={4}>
              <Form.Label>Display name</Form.Label>
              <Form.Control
                placeholder="e.g., badger-foodie"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col sm={6} md={4}>
              <Form.Label>PIN</Form.Label>
              <Form.Control
                type="password"
                placeholder="4–6 characters"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
            </Col>
          </Row>

          <Row className="g-2 mb-3">
            <Col sm="auto">
              <Form.Check
                type="radio"
                label="Sign in"
                name="auth-mode"
                id="auth-signin"
                checked={mode === "signin"}
                onChange={() => setMode("signin")}
              />
            </Col>
            <Col sm="auto">
              <Form.Check
                type="radio"
                label="Create account"
                name="auth-mode"
                id="auth-create"
                checked={mode === "create"}
                onChange={() => setMode("create")}
              />
            </Col>
          </Row>

          <Row className="g-2 mb-3">
            <Col sm="auto">
              <Button type="submit">
                {mode === "signin" ? "Sign In" : "Create Account"}
              </Button>
            </Col>
          </Row>
        </Form>
      )}

      {currentUser && (
        <div className="mt-3">
          <Button variant="outline-danger" type="button" onClick={onSignOut}>
            Sign Out
          </Button>
        </div>
      )}

      <p className="text-muted mt-3">
        Your name and PIN are stored only in your browser for this demo.
      </p>
    </Container>
  );
}
