// src/components/SiteNav.jsx
import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function SiteNav({ currentUser, onSignOut }) {
  return (
    <Navbar bg="light" expand="md" fixed="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          UW Dining Reviews
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/reviews">
              Reviews
            </Nav.Link>
            <Nav.Link as={NavLink} to="/menus">
              Hall Stats
            </Nav.Link>
            <Nav.Link as={NavLink} to="/sample-menu">
              Menu Today
            </Nav.Link>
            <Nav.Link as={NavLink} to="/my-stats">
              My Stats
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
          </Nav>
          <Nav>
            {currentUser ? (
              <Button variant="danger" size="sm" onClick={onSignOut}>
                Sign Out ({currentUser})
              </Button>
            ) : (
              <Button
                as={NavLink}
                to="/auth"
                variant="danger"
                size="sm"
              >
                Sign up / Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
