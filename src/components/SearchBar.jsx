// src/components/SearchBar.jsx
import { Row, Col, Form } from "react-bootstrap";

export default function SearchBar({
  diningHalls,
  items,
  selectedHall,
  onHallChange,
  selectedItem,
  onItemChange,
  userFilter,
  onUserChange,
  searchText,
  onSearchTextChange,
}) {
  return (
    <Form className="mb-3" aria-label="Filter reviews">
      <Row className="g-2">
        <Col xs={12} md={3}>
          <Form.Group controlId="filterHall">
            <Form.Label>Dining hall</Form.Label>
            <Form.Select
              value={selectedHall}
              onChange={(e) => onHallChange(e.target.value)}
            >
              <option value="">All halls</option>
              {diningHalls.map((hall) => (
                <option key={hall} value={hall}>
                  {hall}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs={12} md={3}>
          <Form.Group controlId="filterItem">
            <Form.Label>Item</Form.Label>
            <Form.Select
              value={selectedItem}
              onChange={(e) => onItemChange(e.target.value)}
              disabled={items.length === 0}
            >
              <option value="">
                {items.length === 0 ? "Select a hall first" : "All items"}
              </option>
              {items.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs={12} md={3}>
          <Form.Group controlId="filterUser">
            <Form.Label>Reviewer</Form.Label>
            <Form.Control
              type="text"
              placeholder="Filter by username…"
              value={userFilter}
              onChange={(e) => onUserChange(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col xs={12} md={3}>
          <Form.Group controlId="filterSearch">
            <Form.Label>Search text</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search reviews…"
              value={searchText}
              onChange={(e) => onSearchTextChange(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}
