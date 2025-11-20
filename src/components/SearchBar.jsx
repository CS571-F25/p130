import { Row, Col, Form, Button } from "react-bootstrap";

export default function SearchBar({
  hall, setHall,
  item, setItem,
  onSearch
}) {
  return (
    <Form className="mb-3" onSubmit={(e) => { e.preventDefault(); onSearch?.(); }}>
      <Row className="g-2">
        <Col sm={5}>
          <Form.Control
            placeholder="Dining hall (e.g., Four Lakes Market)"
            value={hall}
            onChange={(e) => setHall(e.target.value)}
          />
        </Col>
        <Col sm={5}>
          <Form.Control
            placeholder="Item (e.g., burger)"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </Col>
        <Col sm={2}>
          <Button type="submit" className="w-100">Search</Button>
        </Col>
      </Row>
    </Form>
  );
}
