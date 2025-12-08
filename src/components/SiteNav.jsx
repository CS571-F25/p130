// src/components/SiteNav.jsx
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function SiteNav({ currentUser, onLogout }) {
  const handleLogoutClick = (e) => {
    e.preventDefault();
    onLogout?.();
  };

  return (
    <Navbar expand="md" className="mb-3" sticky="top">
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
              Menus &amp; Ratings
            </Nav.Link>
            <Nav.Link as={NavLink} to="/sample-menu">
              Sample Menu
            </Nav.Link>
            <Nav.Link as={NavLink} to="/stats">
              My Stats
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto align-items-center">
            {currentUser ? (
              <>
                <span className="me-2 small text-muted">
                  Signed in as <strong>{currentUser}</strong>
                </span>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={handleLogoutClick}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Nav.Link as={NavLink} to="/auth">
                Sign up / Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
