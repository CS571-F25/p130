// src/components/ReviewForm.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import SearchableSelect from "./SearchableSelect.jsx";
import { DINING_HALLS, getItemsForHall } from "../data/menu.js";

export default function ReviewForm(props) {
  const {
    currentUser,
    onSubmitReview,
    onAddReview, // older prop name, still supported
    onCancel,
    initialHall,
    initialItem,
  } = props;

  const [hall, setHall] = useState(initialHall || "");
  const [item, setItem] = useState(initialItem || "");
  const [rating, setRating] = useState(5);
  const [wouldAgain, setWouldAgain] = useState(true);
  const [text, setText] = useState("");

  useEffect(() => {
    if (initialHall) {
      setHall(initialHall);
    }
    if (initialItem) {
      setItem(initialItem);
    }
  }, [initialHall, initialItem]);

  const availableItems = useMemo(
    () => (hall ? getItemsForHall(hall) : []),
    [hall],
  );

  const handleHallChange = (value) => {
    setHall(value);
    if (!getItemsForHall(value).includes(item)) {
      setItem("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const handler = onSubmitReview || onAddReview;
    if (!handler || !currentUser) return;
    if (!hall || !item) return;

    const newReview = {
      id: crypto.randomUUID(),
      hall,
      item,
      rating: Number(rating),
      wouldOrderAgain: Boolean(wouldAgain),
      text: text.trim(),
      user: currentUser,
      createdAt: new Date().toISOString(),
    };

    handler(newReview);

    // Reset for another review, but keep hall/item for convenience.
    setRating(5);
    setWouldAgain(true);
    setText("");
  };

  const handleCancelClick = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <Form onSubmit={handleSubmit} aria-label="Add a dining hall review">
      <Row className="mb-3">
        <Col md={6}>
          <SearchableSelect
            label="Dining hall"
            placeholder="Select a dining hall..."
            value={hall}
            onChange={handleHallChange}
            options={DINING_HALLS}
            disabled={!currentUser}
          />
        </Col>
        <Col md={6}>
          <SearchableSelect
            label="Item"
            placeholder="Select an item..."
            value={item}
            onChange={setItem}
            options={availableItems}
            disabled={!currentUser || !hall}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="ratingSelect">
            <Form.Label>Rating (1–5)</Form.Label>
            <Form.Select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              disabled={!currentUser}
            >
              <option value={5}>5 stars</option>
              <option value={4}>4 stars</option>
              <option value={3}>3 stars</option>
              <option value={2}>2 stars</option>
              <option value={1}>1 star</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group as={Row} controlId="wouldOrderAgain">
            <Form.Label column sm={6}>
              Would order again?
            </Form.Label>
            <Col sm={6}>
              <Form.Check
                inline
                type="radio"
                name="wouldAgain"
                id="wouldAgainYes"
                label="Yes"
                checked={wouldAgain === true}
                onChange={() => setWouldAgain(true)}
                disabled={!currentUser}
              />
              <Form.Check
                inline
                type="radio"
                name="wouldAgain"
                id="wouldAgainNo"
                label="No"
                checked={wouldAgain === false}
                onChange={() => setWouldAgain(false)}
                disabled={!currentUser}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="reviewText" className="mb-2">
        <Form.Label>Short description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="What did you like or dislike?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={!currentUser}
        />
      </Form.Group>

      {/* Buttons: opposite sides, Cancel white with red outline (btn-secondary) */}
      <div className="d-flex justify-content-between mt-3">
        <Button type="submit" disabled={!currentUser}>
          Post review
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={handleCancelClick}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
}
