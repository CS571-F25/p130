// src/pages/Home.jsx
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DINING_HALLS, HALL_ITEMS } from "../data/menu.js";

export default function Home() {
  return (
    <Container className="page">
      <Row className="mb-4">
        <Col md={8}>
          <h2>UW Dining Hall Reviewer</h2>
          <p>
            Use this site to see what other students think about different
            dining halls and menu items on campus. Browse reviews, filter by
            hall or item, and share your own experiences to help other students
            dodge the mid cafeteria L meal.
          </p>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>How it works</Card.Title>
              <ul className="mb-0">
                <li>Sign up with a name + PIN (stored only on this device).</li>
                <li>Pick a dining hall and item to review.</li>
                <li>Leave a rating, description, and if you’d order it again.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h3 className="mb-3">Dining halls</h3>
      <Row className="g-3">
        {DINING_HALLS.map((hall) => {
          const items = HALL_ITEMS[hall] || [];
          const sample = items.slice(0, 3);
          return (
            <Col key={hall} md={4} sm={6}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{hall}</Card.Title>
                  {sample.length > 0 && (
                    <>
                      <Card.Subtitle className="mb-2 text-muted">
                        Example items
                      </Card.Subtitle>
                      <div className="mb-2 d-flex flex-wrap gap-1">
                        {sample.map((it) => (
                          <Badge key={it} bg="secondary">
                            {it}
                          </Badge>
                        ))}
                      </div>
                    </>
                  )}
                  <Button
                    as={Link}
                    to="/reviews"
                    size="sm"
                    variant="outline-primary"
                  >
                    View reviews
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
