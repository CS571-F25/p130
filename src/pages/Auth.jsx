import { Container, Button } from "react-bootstrap";

export default function Auth() {
  return (
    <Container className="page">
      <h2>Sign In / Create Account</h2>
      <p className="text-muted">Auth is placeholder for now. In the full version users must sign in to post reviews.</p>
      <div className="d-flex gap-2">
        <Button variant="outline-primary" type="button">Sign In</Button>
        <Button variant="primary" type="button">Create Account</Button>
      </div>
    </Container>
  );
}
