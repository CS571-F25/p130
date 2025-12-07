import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DINING_HALLS, HALL_ITEMS } from "../data/menu.js";

export default function Home() {
  return (
    <Container className="page">
      <Row className="mb-4">
        <Col md={8}>
          <h1 className="h2">UW Dining Hall Reviewer</h1>
          <p>
            Use this site to see what other students think about different
            dining halls and menu items on campus. Browse reviews, filter by
            hall or item, and share your own experiences to help other students
            find the clutch meals and dodge the L ones.
          </p>
        </Col>
        <Col md={4}>
          <Card className="page-intro-card">
            <Card.Body>
              <Card.Title className="h5">How it works</Card.Title>
              <ul className="mb-0">
                <li>Sign up with a display name and 4–6 digit PIN.</li>
                <li>Pick a dining hall and item to review.</li>
                <li>Rate it, describe it, and say if you&rsquo;d order again.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h2 className="h4 mb-3">Dining halls</h2>
      <Row className="g-3">
        {DINING_HALLS.map((hall) => {
          const items = HALL_ITEMS[hall] || [];
          const sample = items.slice(0, 3);
          return (
            <Col key={hall} md={4} sm={6}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title className="h5">{hall}</Card.Title>
                  {sample.length > 0 && (
                    <div className="mb-2 d-flex flex-wrap gap-1">
                      {sample.map((it) => (
                        <Badge key={it} bg="secondary">
                          {it}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <Button
                    as={Link}
                    to="/reviews"
                    state={{ hall }}
                    size="sm"
                  >
                    View reviews for {hall}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
