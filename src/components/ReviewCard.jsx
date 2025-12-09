// src/components/ReviewCard.jsx
import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import RatingStars from "./RatingStars.jsx";
import { getImageForItem } from "../data/menu.js";

export default function ReviewCard({ review, currentUser, onDelete }) {
  const authorName =
    review.username ||
    review.author ||
    review.user ||
    review.reviewer ||
    "Anonymous";

  const imageUrl = getImageForItem(review.item);

  const isUserReview =
    typeof review.id === "string" && review.id.startsWith("user-");

  const canDelete = Boolean(
    currentUser && isUserReview && authorName === currentUser,
  );

  const handleDelete = () => {
    if (!canDelete || !onDelete) return;
    onDelete(review.id);
  };

  return (
    <Card className="mb-3 shadow-sm review-card" aria-label="Dining review">
      <Card.Body>
        <div className="item-image-circle">
          <img
            src={imageUrl}
            alt={review.item}
            className="item-image-photo"
          />
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
            {review.wouldOrderAgain ? (
              <Badge bg="success">Yes</Badge>
            ) : (
              <Badge bg="secondary">No</Badge>
            )}
          </div>

          {review.text && (
            <Card.Text className="mb-1">{review.text}</Card.Text>
          )}

          <Card.Text className="text-muted mb-0" as="small">
            by {authorName}
          </Card.Text>
        </div>

        {canDelete && (
          <div className="ms-3 d-flex align-items-start">
            <Button
              variant="danger"
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
