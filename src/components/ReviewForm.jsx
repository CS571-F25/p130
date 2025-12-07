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
    setAvailableItems(getItemsForHall(hall));
    // clear item if it no longer belongs to selected hall
    if (item && !getItemsForHall(hall).includes(item)) {
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
    if (!trimmed(hall) || !trimmed(item)) {
      return;
    }
    const review = {
      hall: trimmed(hall),
      item: trimmed(item),
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
                label="Dining Hall"
                options={DINING_HALLS}
                value={hall}
                onChange={setHall}
                placeholder="Type hall name…"
              />
            </Col>
            <Col md={6}>
              <SearchableSelect
                label="Item (filtered by hall)"
                options={availableItems}
                value={item}
                onChange={setItem}
                placeholder={
                  hall
                    ? `Items at ${hall}…`
                    : "Choose a hall first or browse all…"
                }
              />
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={6}>
              <Form.Label>Rating</Form.Label>
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
            </Col>
            <Col md={6}>
              <Form.Label>Would order again?</Form.Label>
              <Form.Select
                value={wouldAgain ? "yes" : "no"}
                onChange={(e) => setWouldAgain(e.target.value === "yes")}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Form.Select>
            </Col>
          </Row>

          <div className="mb-0">
            <Form.Label>Short description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What did you think of this item?"
            />
          </div>
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
