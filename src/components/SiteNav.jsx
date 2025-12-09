// src/components/SiteNav.jsx
import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  getCurrentUserFromCookie,
  clearCurrentUserCookie,
} from "../utils/cookies.js";

export default function SiteNav() {
  const currentUser = getCurrentUserFromCookie();

  const handleSignOut = () => {
    clearCurrentUserCookie();
    // Force a full refresh so all pages re-check auth from cookies
    window.location.reload();
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      fixed="top"
      className="shadow-sm"
      aria-label="Primary navigation"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          UW Dining Reviews
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/reviews">
              Reviews
            </Nav.Link>
            {/* Menus & Ratings overview (existing Menus.jsx page) */}
            <Nav.Link as={NavLink} to="/menus">
              Hall Ratings
            </Nav.Link>
            {/* Nutrislice-style example daily menu (SampleMenu.jsx) */}
            <Nav.Link as={NavLink} to="/sample-menu">
              Menu Today
            </Nav.Link>
            <Nav.Link as={NavLink} to="/mystats">
              My Stats
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center gap-2">
            {currentUser ? (
              <>
                <span className="text-muted small d-none d-md-inline">
                  Signed in as <strong>{currentUser}</strong>
                </span>
                <Button type="button" onClick={handleSignOut}>
                  Sign out
                </Button>
              </>
            ) : (
              <Button
                as={NavLink}
                to="/auth"
                type="button"
                className="btn-nav-outline"
              >
                Sign up / Login
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
