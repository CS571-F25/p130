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

  const changeHall = (newHall) => {
    setHall(newHall);
  };

  const changeItem = (val) => {
    setItem(val);
  };

  return (
    <div className="mb-3">
      <Row className="align-items-center g-2">
        <Col md={8}>
          <Form.Label className="mb-1">Filter by dining hall</Form.Label>
          <div className="d-flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={isAll ? "primary" : "outline-primary"}
              onClick={() => changeHall("")}
            >
              All halls
            </Button>
            {DINING_HALLS.map((h) => (
              <Button
                key={h}
                size="sm"
                variant={hall === h ? "primary" : "outline-primary"}
                onClick={() => changeHall(h)}
              >
                {h}
              </Button>
            ))}
          </div>
        </Col>
        <Col md={4}>
          <Form.Label className="mb-1">Filter by item name</Form.Label>
          <Form.Control
            value={item}
            placeholder="e.g., pizza, burger, salad…"
            onChange={(e) => changeItem(e.target.value)}
          />
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
