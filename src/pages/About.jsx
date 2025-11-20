import { Container } from "react-bootstrap";

export default function About() {
  return (
    <Container className="page">
      <h2>About this site</h2>
      <p>
        A simple dining hall reviewer for UW students. Leave ratings, a short description,
        a yes/no for “order again,” and an optional image. Filter by hall and item.
      </p>
      <p className="text-muted">Built with React + Vite + React-Bootstrap. Routing via HashRouter.</p>
    </Container>
  );
}
