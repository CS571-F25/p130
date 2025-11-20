import { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import SearchableSelect from "./SearchableSelect.jsx";
import { DINING_HALLS, ITEM_NAMES } from "../data/menu.js";

export default function ReviewForm({ show, onClose, onSave }) {
  const [hall, setHall] = useState("");
  const [item, setItem] = useState("");
  const [rating, setRating] = useState(5);
  const [wouldAgain, setWouldAgain] = useState(true);
  const [text, setText] = useState("");

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
      // require both hall and item
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
                placeholder="dining halls..."
              />
            </Col>
            <Col md={6}>
              <SearchableSelect
                label="Item"
                options={ITEM_NAMES}
                value={item}
                onChange={setItem}
                placeholder="items..."
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
            />
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={submit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}
