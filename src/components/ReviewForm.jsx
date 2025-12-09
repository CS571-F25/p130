// src/components/ReviewForm.jsx
import React, { useMemo, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { DINING_HALLS, getItemsForHall } from "../data/menu.js";

export default function ReviewForm({ currentUser, onSubmit, onCancel }) {
  const [hall, setHall] = useState("");
  const [item, setItem] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [orderAgain, setOrderAgain] = useState(null);

  const itemsForHall = useMemo(
    () => (hall ? getItemsForHall(hall) ?? [] : []),
    [hall],
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation to avoid empty posts
    if (!hall || !item || !rating || orderAgain === null) {
      return;
    }

    const newReview = {
      hall,
      item,
      rating: Number(rating),
      text: text.trim(),
      wouldOrderAgain: orderAgain === "yes",
      user: currentUser,
      createdAt: new Date().toISOString(),
    };

    onSubmit(newReview);

    // Reset form
    setHall("");
    setItem("");
    setRating(5);
    setText("");
    setOrderAgain(null);
  };

  return (
    <Form onSubmit={handleSubmit} aria-label="Add a new dining review">
      <Row className="gy-3">
        <Col xs={12} md={6}>
          <Form.Group controlId="reviewHall">
            <Form.Label>Dining hall</Form.Label>
            <Form.Select
              value={hall}
              onChange={(e) => {
                setHall(e.target.value);
                setItem("");
              }}
            >
              <option value="">Select a hall…</option>
              {DINING_HALLS.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group controlId="reviewItem">
            <Form.Label>Item</Form.Label>
            <Form.Select
              value={item}
              onChange={(e) => setItem(e.target.value)}
              disabled={!hall}
            >
              <option value="">
                {hall ? "Select an item…" : "Select a hall first"}
              </option>
              {itemsForHall.map((it) => (
                <option key={it} value={it}>
                  {it}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs={12} md={4}>
          <Form.Group controlId="reviewRating">
            <Form.Label>Rating</Form.Label>
            <Form.Select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs={12} md={8}>
          <Form.Group controlId="reviewOrderAgain">
            <Form.Label>Would you order again?</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                id="orderAgainYes"
                label="Yes"
                name="order-again"
                value="yes"
                checked={orderAgain === "yes"}
                onChange={(e) => setOrderAgain(e.target.value)}
              />
              <Form.Check
                inline
                type="radio"
                id="orderAgainNo"
                label="No"
                name="order-again"
                value="no"
                checked={orderAgain === "no"}
                onChange={(e) => setOrderAgain(e.target.value)}
              />
            </div>
          </Form.Group>
        </Col>

        <Col xs={12}>
          <Form.Group controlId="reviewText">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <Button variant="danger" type="submit">
          Post review
        </Button>
        <Button
          variant="outline-danger"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
}
