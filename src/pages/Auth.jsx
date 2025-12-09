// src/pages/Auth.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  getCurrentUserFromCookie,
  setCurrentUserCookie,
  clearCurrentUserCookie,
} from "../utils/cookies.js";

const USERS_KEY = "uwDiningUsers";

function safeLoadUsers() {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function safeSaveUsers(users) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // ignore
  }
}

export default function Auth() {
  const navigate = useNavigate();

  const [authMode, setAuthMode] = useState("login"); // "login" | "signup"
  const [users, setUsers] = useState(() => safeLoadUsers());

  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [pinConfirm, setPinConfirm] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [cookieUser, setCookieUser] = useState(null);

  useEffect(() => {
    setCookieUser(getCurrentUserFromCookie());
  }, []);

  const isLoggedIn = useMemo(() => !!cookieUser, [cookieUser]);

  const resetMessages = () => {
    setError("");
    setSuccess("");
  };

  const handleSwitchMode = (mode) => {
    setAuthMode(mode);
    resetMessages();
  };

  const validatePinLength = (value) => value.length >= 4 && value.length <= 6;

  const handleSignup = (e) => {
    e.preventDefault();
    resetMessages();

    const trimmedUser = username.trim();
    if (!trimmedUser) {
      setError("Please enter a username.");
      return;
    }

    if (!validatePinLength(pin)) {
      setError("PIN must be between 4 and 6 characters.");
      return;
    }

    if (pin !== pinConfirm) {
      setError("PIN and confirm PIN must match.");
      return;
    }

    if (users[trimmedUser]) {
      setError("An account with that username already exists.");
      return;
    }

    const updated = { ...users, [trimmedUser]: pin };
    setUsers(updated);
    safeSaveUsers(updated);

    setCurrentUserCookie(trimmedUser);
    setCookieUser(trimmedUser);

    setSuccess("Account created and signed in.");
    setUsername(trimmedUser);
    setPin("");
    setPinConfirm("");

    // Go straight to home after signup
    navigate("/");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    resetMessages();

    const trimmedUser = username.trim();
    const storedPin = users[trimmedUser];

    // 1) Account existence check first
    if (!storedPin) {
      setError("This account does not exist.");
      return;
    }

    // 2) PIN length check
    if (!validatePinLength(pin)) {
      setError("PIN must be between 4 and 6 characters.");
      return;
    }

    // 3) PIN correctness
    if (storedPin !== pin) {
      setError("Incorrect PIN.");
      return;
    }

    setCurrentUserCookie(trimmedUser);
    setCookieUser(trimmedUser);

    setSuccess("Successfully signed in.");
    setPin("");

    // Go straight to home after login
    navigate("/");
  };

  const handleSignOut = () => {
    clearCurrentUserCookie();
    setCookieUser(null);
    setSuccess("You have been signed out.");
    setError("");
  };

  const authHeading =
    authMode === "signup" ? "Create an account" : "Sign in to your account";

  return (
    <Container className="py-4">
      <h1 className="mb-3">Sign up / Login</h1>
      <p className="text-muted mb-4">
        Create an account or sign in to leave reviews and manage your dining
        hall experience. Your login state is remembered using cookies on this
        device.
      </p>

      <Card className="shadow-sm">
        <Card.Body>
          <Row className="mb-3">
            <Col xs="auto">
              <Button
                type="button"
                className={
                  authMode === "login"
                    ? "auth-toggle-active"
                    : "auth-toggle-inactive"
                }
                onClick={() => handleSwitchMode("login")}
              >
                Login
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                type="button"
                className={
                  authMode === "signup"
                    ? "auth-toggle-active"
                    : "auth-toggle-inactive"
                }
                onClick={() => handleSwitchMode("signup")}
              >
                Sign up
              </Button>
            </Col>
          </Row>

          <h2 className="h4 mb-3">{authHeading}</h2>

          {isLoggedIn && (
            <Alert variant="info" className="mb-3">
              You are currently signed in as <strong>{cookieUser}</strong>. You
              can sign out below.
            </Alert>
          )}

          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}
          {success && (
            <Alert variant="success" className="mb-3">
              {success}
            </Alert>
          )}

          {authMode === "signup" ? (
            <Form onSubmit={handleSignup} aria-label="Sign up form">
              <Form.Group className="mb-3" controlId="signupUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="signupPin">
                <Form.Label>PIN (4–6 characters)</Form.Label>
                <Form.Control
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="signupPinConfirm">
                <Form.Label>Confirm PIN</Form.Label>
                <Form.Control
                  type="password"
                  value={pinConfirm}
                  onChange={(e) => setPinConfirm(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center">
                <Button type="submit">Create account</Button>
                {isLoggedIn && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </Button>
                )}
              </div>
            </Form>
          ) : (
            <>
              {!isLoggedIn ? (
                <Form onSubmit={handleLogin} aria-label="Login form">
                  <Form.Group className="mb-3" controlId="loginUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="loginPin">
                    <Form.Label>PIN (4–6 characters)</Form.Label>
                    <Form.Control
                      type="password"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      autoComplete="current-password"
                      required
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center">
                    <Button type="submit">Login</Button>
                  </div>
                </Form>
              ) : (
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0">
                    You&apos;re already signed in as{" "}
                    <strong>{cookieUser}</strong>.
                  </p>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </Button>
                </div>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
