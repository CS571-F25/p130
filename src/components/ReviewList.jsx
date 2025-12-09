// src/components/ReviewList.jsx
import React from "react";
import { Row, Col } from "react-bootstrap";
import ReviewCard from "./ReviewCard.jsx";

export default function ReviewList({ reviews, currentUser, onDeleteReview }) {
  if (!reviews || reviews.length === 0) {
    return (
      <p className="text-muted">
        No reviews match these filters yet. Try changing the filters or add the
        first review!
      </p>
    );
  }

  return (
    <Row className="g-3">
      {reviews.map((review) => (
        <Col key={review.id} md={12} lg={6}>
          <ReviewCard
            review={review}
            currentUser={currentUser}
            onDelete={onDeleteReview}
          />
        </Col>
      ))}
    </Row>
  );
}
