// src/components/ReviewForm.jsx
import { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import SearchableSelect from "./SearchableSelect.jsx";
import {
  DINING_HALLS,
  getItemsForHall,
  ITEM_NAMES
} from "../data/menu.js";

export default function ReviewForm({ show, onClose, onSave }) {
  const [hall, setHall] = useState("");
  const [item, setItem] = useState("");
  const [rating, setRating] = useState(5);
  const [wouldAgain, setWouldAgain] = useState(true);
  const [text, setText] = useState("");

  const [availableItems, setAvailableItems] = useState(ITEM_NAMES);

  useEffect(() => {
    const itemsForHall = getItemsForHall(hall);
    setAvailableItems(itemsForHall);
    if (item && !itemsForHall.includes(item)) {
      setItem("");
    }
  }, [hall, item]);

  const reset = () => {
    setHall("");
    setItem("");
    setRating(5);
    setWouldAgain(true);
    setText("");
  };

  const submit = () => {
    const trimmed = (s) => (s || "").trim();
    const hallVal = trimmed(hall);
    const itemVal = trimmed(item);
    if (!hallVal || !itemVal) {
      return;
    }
    const review = {
      hall: hallVal,
      item: itemVal,
      rating: Number(rating),
      wouldAgain: Boolean(wouldAgain),
      text: trimmed(text)
    };
    onSave?.(review);
    reset();
    onClose?.();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>New Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-2">
            <Col md={6}>
              <SearchableSelect
                id="hall-select"
                label="Dining hall"
                options={DINING_HALLS}
                value={hall}
                onChange={setHall}
                placeholder="Type hall name…"
              />
            </Col>
            <Col md={6}>
              <SearchableSelect
                id="item-select"
                label="Item (filtered by hall)"
                options={availableItems}
                value={item}
                onChange={setItem}
                placeholder={
                  hall ? `Items at ${hall}…` : "Choose a hall or type to search…"
                }
              />
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={6}>
              <Form.Group controlId="rating-select">
                <Form.Label>Rating (1–5)</Form.Label>
                <Form.Select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="would-again-select">
                <Form.Label>Would order again?</Form.Label>
                <Form.Select
                  value={wouldAgain ? "yes" : "no"}
                  onChange={(e) => setWouldAgain(e.target.value === "yes")}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="review-text">
            <Form.Label>Short description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What did you think of this item?"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={submit}>Save Review</Button>
      </Modal.Footer>
    </Modal>
  );
}
