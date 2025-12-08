// src/pages/Auth.jsx
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";

const ACCOUNTS_KEY = "uwDiningAccounts";

function loadAccounts() {
  try {
    const raw = window.localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveAccounts(accounts) {
  try {
    window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch {
    // ignore
  }
}

export default function Auth({ currentUser, onLogin, onLogout }) {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [pinConfirm, setPinConfirm] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [message, setMessage] = useState("");
  const [messageVariant, setMessageVariant] = useState("info");

  useEffect(() => {
    setAccounts(loadAccounts());
  }, []);

  const resetMessages = () => {
    setMessage("");
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    resetMessages();
  };

  const normalizedUsername = username.trim();

  const findAccount = (name) => {
    const target = name.trim().toLowerCase();
    return accounts.find(
      (acc) => acc.username.trim().toLowerCase() === target
    );
  };

  const validatePinLength = (value) => {
    return value.length >= 4 && value.length <= 6;
  };

  const handleSignup = (event) => {
    event.preventDefault();
    resetMessages();

    if (!normalizedUsername) {
      setMessageVariant("danger");
      setMessage("Please enter a username.");
      return;
    }

    if (!validatePinLength(pin)) {
      setMessageVariant("danger");
      setMessage("PIN must be between 4 and 6 characters.");
      return;
    }

    if (pin !== pinConfirm) {
      setMessageVariant("danger");
      setMessage("PIN and confirmation PIN do not match.");
      return;
    }

    if (findAccount(normalizedUsername)) {
      setMessageVariant("danger");
      setMessage("An account with that name already exists.");
      return;
    }

    const newAccount = {
      username: normalizedUsername,
      pin,
    };
    const updated = [...accounts, newAccount];
    setAccounts(updated);
    saveAccounts(updated);

    setMessageVariant("success");
    setMessage("Account created! You are now signed in.");
    setPin("");
    setPinConfirm("");

    // Actually log the user in (this is the critical part).
    onLogin?.(normalizedUsername);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    resetMessages();

    if (!normalizedUsername) {
      setMessageVariant("danger");
      setMessage("Please enter a username.");
      return;
    }

    const account = findAccount(normalizedUsername);

    // Per your earlier requirement: check "account does not exist"
    // before any PIN errors.
    if (!account) {
      setMessageVariant("danger");
      setMessage("This account does not exist.");
      return;
    }

    if (!validatePinLength(pin)) {
      setMessageVariant("danger");
      setMessage("PIN must be between 4 and 6 characters.");
      return;
    }

    if (account.pin !== pin) {
      setMessageVariant("danger");
      setMessage("Incorrect PIN for this account.");
      return;
    }

    setMessageVariant("success");
    setMessage("Signed in successfully.");
    setPin("");

    // Tell App.jsx that login succeeded so currentUser is set,
    // navbar updates, and Reviews can allow posting.
    onLogin?.(account.username);
  };

  const handleLogoutClick = () => {
    resetMessages();
    onLogout?.();
    setMessageVariant("info");
    setMessage("You have been signed out.");
  };

  const isLoggedIn = Boolean(currentUser);

  return (
    <Container className="page">
      <h1 className="h2">Sign up / Login</h1>
      <p className="text-muted">
        Create a simple account with a username and 4–6 digit PIN to post
        reviews and see your personalized stats. Your login is stored in a
        cookie so you stay signed in when you refresh this site on this
        browser.
      </p>

      {message && (
        <Alert
          variant={messageVariant}
          className="mt-2"
          role="status"
          aria-live="polite"
        >
          {message}
        </Alert>
      )}

      {isLoggedIn ? (
        <Card className="mt-3">
          <Card.Body>
            <h2 className="h4 mb-3">You&apos;re signed in</h2>
            <p className="mb-3">
              You are currently signed in as{" "}
              <strong>{currentUser}</strong>. You can now add reviews, see
              your stats, and interact with the site.
            </p>
            <Button variant="outline-primary" onClick={handleLogoutClick}>
              Sign Out
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Card className="mt-3">
          <Card.Body>
            <Row className="mb-3">
              <Col xs="auto">
                <Form.Check
                  type="radio"
                  id="auth-login"
                  name="auth-mode"
                  label="Login"
                  checked={mode === "login"}
                  onChange={() => handleModeChange("login")}
                />
              </Col>
              <Col xs="auto">
                <Form.Check
                  type="radio"
                  id="auth-signup"
                  name="auth-mode"
                  label="Sign up"
                  checked={mode === "signup"}
                  onChange={() => handleModeChange("signup")}
                />
              </Col>
            </Row>

            <Form
              onSubmit={mode === "login" ? handleLogin : handleSignup}
              aria-label={
                mode === "login" ? "Login to an existing account" : "Sign up for a new account"
              }
            >
              <Form.Group className="mb-3" controlId="authUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="authPin">
                <Form.Label>PIN (4–6 characters)</Form.Label>
                <Form.Control
                  type="password"
                  autoComplete={
                    mode === "login" ? "current-password" : "new-password"
                  }
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                  aria-describedby="pinHelp"
                />
                <Form.Text id="pinHelp" muted>
                  Use a simple 4–6 character PIN. This is for this site
                  only, not your real passwords.
                </Form.Text>
              </Form.Group>

              {mode === "signup" && (
                <Form.Group className="mb-3" controlId="authPinConfirm">
                  <Form.Label>Confirm PIN</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="new-password"
                    value={pinConfirm}
                    onChange={(e) => setPinConfirm(e.target.value)}
                    required
                  />
                </Form.Group>
              )}

              <Button type="submit" variant="primary">
                {mode === "login" ? "Login" : "Create Account"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
