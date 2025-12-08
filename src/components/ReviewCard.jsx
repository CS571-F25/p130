import React from "react";
import { Card, Button } from "react-bootstrap";
import RatingStars from "./RatingStars.jsx";
import FoodIcon from "./FoodIcon.jsx";

export default function ReviewCard({ review, currentUser, onDelete }) {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(review.id);
    }
  };

  const canDelete = currentUser && review.username === currentUser;

  return (
    <Card className="mb-3 shadow-sm review-card" aria-label="Dining review">
      <Card.Body className="d-flex flex-row">
        <div className="me-3 d-flex align-items-center">
          <FoodIcon itemName={review.item} />
        </div>

        <div className="flex-grow-1">
          <Card.Title as="h3" className="h5 mb-1">
            {review.hall} — {review.item}
          </Card.Title>

          <div className="mb-1">
            <strong>Rating: </strong>
            <RatingStars rating={review.rating} />
          </div>

          <div className="mb-1">
            <strong>Would order again?</strong>{" "}
            {review.wouldOrderAgain ? "Yes" : "No"}
          </div>

          {review.text && (
            <Card.Text className="mb-1">{review.text}</Card.Text>
          )}

          <Card.Text className="text-muted mb-0" as="small">
            by {review.username}
          </Card.Text>
        </div>

        {canDelete && (
          <div className="ms-3 d-flex align-items-start">
            <Button
              variant="outline-danger"
              size="sm"
              onClick={handleDelete}
              aria-label="Delete this review"
            >
              Delete
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
