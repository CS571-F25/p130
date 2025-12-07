import { Container, Card } from "react-bootstrap";

export default function About() {
  return (
    <Container className="page">
      <h1 className="h2">About this project</h1>
      <Card>
        <Card.Body>
          <Card.Text>
            This site is a UW–Madison dining hall review tool built with React,
            Vite, React Bootstrap, and React Router. Students can sign in with a
            simple name + PIN, browse reviews for different dining halls and
            menu items, and add their own ratings and comments.
          </Card.Text>
          <Card.Text>
            The Reviews page focuses on individual posts and filtering, while
            the Menus &amp; Ratings page summarizes average ratings and
            &ldquo;would order again&rdquo; percentages across halls. The goal
            is to make it easier for students to quickly decide what&apos;s
            worth trying on campus.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
