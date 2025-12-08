// src/components/ReviewForm.jsx
import React, { useMemo, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import {
  DINING_HALLS,
  getItemsForHall,
  ITEM_NAMES,
} from "../data/menu.js";

export default function ReviewForm({ currentUser, onAddReview }) {
  const [hall, setHall] = useState("");
  const [item, setItem] = useState("");
  const [rating, setRating] = useState("5");
  const [wouldAgain, setWouldAgain] = useState("yes");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const availableItems = useMemo(
    () => getItemsForHall(hall),
    [hall],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!currentUser) {
      setError("You must be signed in to post a review.");
      return;
    }

    if (!hall || !item) {
      setError("Please choose a dining hall and an item to review.");
      return;
    }

    const numericRating = Number(rating);
    if (!numericRating || numericRating < 1 || numericRating > 5) {
      setError("Rating must be between 1 and 5 stars.");
      return;
    }

    const newReview = {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      hall,
      item,
      rating: numericRating,
      wouldOrderAgain: wouldAgain === "yes",
      text: text.trim(),
      username: currentUser,
    };

    onAddReview?.(newReview);

    // reset form
    setHall("");
    setItem("");
    setRating("5");
    setWouldAgain("yes");
    setText("");
  };

  const allItems =
    hall && availableItems.length > 0 ? availableItems : ITEM_NAMES;

  return (
    <Form onSubmit={handleSubmit} aria-label="Add a dining hall review">
      <Row className="g-3">
        <Col md={6}>
          <Form.Group controlId="reviewHall">
            <Form.Label>Dining hall</Form.Label>
            <Form.Select
              value={hall}
              onChange={(e) => {
                const newHall = e.target.value;
                setHall(newHall);
                // clear item if no longer valid
                if (
                  newHall &&
                  !getItemsForHall(newHall).includes(item)
                ) {
                  setItem("");
                }
              }}
            >
              <option value="">Select a dining hall…</option>
              {DINING_HALLS.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="reviewItem">
            <Form.Label>Item</Form.Label>
            <Form.Select
              value={item}
              onChange={(e) => setItem(e.target.value)}
            >
              <option value="">Select an item…</option>
              {allItems.map((it) => (
                <option key={it} value={it}>
                  {it}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="g-3 mt-1">
        <Col md={4}>
          <Form.Group controlId="reviewRating">
            <Form.Label>Rating (1–5)</Form.Label>
            <Form.Select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} star{n === 1 ? "" : "s"}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId="reviewWouldAgain">
            <Form.Label>Would order again?</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                id="wouldAgainYes"
                name="wouldAgain"
                label="Yes"
                value="yes"
                checked={wouldAgain === "yes"}
                onChange={(e) => setWouldAgain(e.target.value)}
              />
              <Form.Check
                inline
                type="radio"
                id="wouldAgainNo"
                name="wouldAgain"
                label="No"
                value="no"
                checked={wouldAgain === "no"}
                onChange={(e) => setWouldAgain(e.target.value)}
              />
            </div>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mt-3" controlId="reviewText">
        <Form.Label>Short description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="What did you like or dislike?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Form.Group>

      {error && (
        <div className="text-danger small mt-2" aria-live="polite">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="mt-3"
        variant="primary"
        disabled={!currentUser}
      >
        Post review
      </Button>
    </Form>
  );
}
