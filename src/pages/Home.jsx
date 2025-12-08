// src/pages/Home.jsx
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DINING_HALLS, HALL_ITEMS } from "../data/menu.js";

export default function Home() {
  const navigate = useNavigate();

  const handleViewReviews = (hall) => {
    navigate("/reviews", { state: { hall } });
  };

  return (
    <Container className="py-4">
      <h1 className="mb-3">UW Dining Reviews</h1>
      <p className="text-muted mb-4">
        Quickly see what other Badgers think about food across campus dining
        halls and decide what&apos;s worth the walk.
      </p>

      <h2 className="h4 mb-3">Explore dining halls</h2>

      <Row className="g-4">
        {DINING_HALLS.map((hall) => {
          const items = HALL_ITEMS[hall] || [];
          return (
            <Col md={6} lg={4} key={hall}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title as="h3" className="h5">
                    {hall}
                  </Card.Title>
                  <Card.Text className="text-muted small">
                    Sample items:
                  </Card.Text>
                  <ul className="small mb-3">
                    {items.slice(0, 4).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleViewReviews(hall)}
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
