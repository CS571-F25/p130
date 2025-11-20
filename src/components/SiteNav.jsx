import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SiteNav({ currentUser, onSignOut }) {
  return (
    <Navbar bg="light" expand="md" className="border-bottom">
      <Container>
        <Navbar.Brand as={Link} to="/">
          UW Dining Reviews
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="site-nav" />
        <Navbar.Collapse id="site-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/reviews">
              Reviews
            </Nav.Link>
            <Nav.Link as={Link} to="/auth">
              Sign In
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
          </Nav>
          <div className="d-flex align-items-center gap-2">
            {currentUser ? (
              <>
                <span className="text-muted small">
                  Signed in as <strong>{currentUser}</strong>
                </span>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={onSignOut}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <span className="text-muted small">Not signed in</span>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
