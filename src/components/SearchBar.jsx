// src/components/SearchBar.jsx
import { Row, Col, Button, Form, Badge } from "react-bootstrap";
import { DINING_HALLS } from "../data/menu.js";

export default function SearchBar({
  hall,
  setHall,
  item,
  setItem,
  onClear
}) {
  const isAll = !hall;

  return (
    <div className="mb-3">
      <Row className="align-items-center g-2">
        <Col md={8}>
          <Form.Group>
            <Form.Label className="mb-1">Filter by dining hall</Form.Label>
            <div className="d-flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={isAll ? "primary" : "outline-primary"}
                onClick={() => setHall("")}
              >
                All halls
              </Button>
              {DINING_HALLS.map((h) => (
                <Button
                  key={h}
                  size="sm"
                  variant={hall === h ? "primary" : "outline-primary"}
                  onClick={() => setHall(h)}
                >
                  {h}
                </Button>
              ))}
            </div>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="item-filter">
            <Form.Label className="mb-1">Filter by item name</Form.Label>
            <Form.Control
              value={item}
              placeholder="e.g., pizza, burger, salad…"
              onChange={(e) => setItem(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="align-items-center mt-2">
        <Col>
          {hall || item ? (
            <div className="d-flex flex-wrap gap-2">
              {hall && <Badge bg="secondary">Hall: {hall}</Badge>}
              {item && <Badge bg="secondary">Item: {item}</Badge>}
            </div>
          ) : (
            <span className="text-muted small">Showing all reviews.</span>
          )}
        </Col>
        <Col className="text-end">
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => {
              setHall("");
              setItem("");
              onClear?.();
            }}
          >
            Clear filters
          </Button>
        </Col>
      </Row>
    </div>
  );
}
