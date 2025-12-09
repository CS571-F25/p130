// src/pages/Auth.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import {
  getCurrentUserFromCookie,
  setCurrentUserCookie,
} from "../utils/cookies.js";

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

export default function Auth({ currentUser, onLogin }) {
  const [mode, setMode] = useState("login"); // 'login' or 'signup'
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const cookieUser = getCurrentUserFromCookie();
    if (cookieUser && !currentUser && onLogin) {
      onLogin(cookieUser);
    }
  }, [currentUser, onLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !pin.trim()) {
      setError("Please enter both a username and a PIN.");
      return;
    }

    if (pin.length < 4 || pin.length > 6) {
      setError("PIN must be between 4 and 6 characters.");
      return;
    }

    const accounts = loadAccounts();
    const normalized = username.trim();

    if (mode === "login") {
      if (!accounts[normalized]) {
        setError("This account does not exist. Please sign up first.");
        return;
      }
      if (accounts[normalized].pin !== pin) {
        setError("Incorrect PIN for this account.");
        return;
      }
      setCurrentUserCookie(normalized);
      if (onLogin) onLogin(normalized);
    } else {
      // signup
      if (accounts[normalized]) {
        setError("That username is already taken. Please choose another.");
        return;
      }
      accounts[normalized] = { pin };
      saveAccounts(accounts);
      setCurrentUserCookie(normalized);
      if (onLogin) onLogin(normalized);
    }
  };

  const isSignedIn = Boolean(currentUser);

  return (
    <Container className="py-4">
      <h1 className="mb-3">Sign up / Login</h1>
      <p className="text-muted mb-4">
        Create an account or sign in with your dining review PIN. Accounts are
        stored locally on this browser, and your active login is remembered
        using a cookie.
      </p>

      {isSignedIn && (
        <Alert variant="info">
          You are currently signed in as <strong>{currentUser}</strong>. To
          switch accounts, use the <strong>Sign Out</strong> button in the top
          navigation bar and then return here.
        </Alert>
      )}

      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title as="h2" className="h5 mb-3">
                {mode === "login" ? "Log in to your account" : "Create account"}
              </Card.Title>

              <div className="mb-3">
                <Button
                  type="button"
                  size="sm"
                  className="me-2"
                  onClick={() => setMode("login")}
                  disabled={mode === "login"}
                >
                  Login
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setMode("signup")}
                  disabled={mode === "signup"}
                >
                  Sign up
                </Button>
              </div>

              {error && (
                <Alert variant="danger" className="py-2">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="authUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isSignedIn}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="authPin">
                  <Form.Label>PIN (4–6 characters)</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="current-password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    disabled={isSignedIn}
                  />
                </Form.Group>

                <Button type="submit" disabled={isSignedIn}>
                  {mode === "login" ? "Login" : "Create account"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
