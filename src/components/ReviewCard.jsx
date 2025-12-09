// src/components/ReviewCard.jsx
import React, { useMemo, useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";

function toImagePathFromItemName(itemName) {
  if (!itemName) return "/items/placeholder.jpeg";
  const slug = itemName
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return `/items/${slug}.jpeg`;
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function StarRow({ rating }) {
  const full = Number(rating) || 0;
  const stars = [];
  for (let i = 1; i <= 5; i += 1) {
    stars.push(
      <span
        key={i}
        aria-hidden="true"
        style={{ color: i <= full ? "#c5050c" : "#dee2e6", marginRight: 2 }}
      >
        ★
      </span>,
    );
  }
  return (
    <span>
      {stars}
      <span className="visually-hidden">{full} out of 5 stars</span>
    </span>
  );
}

export default function ReviewCard({ review, currentUser, onDelete }) {
  const [imgSrc, setImgSrc] = useState(
    toImagePathFromItemName(review.item || ""),
  );

  const canDelete = useMemo(
    () => Boolean(currentUser && review.user && currentUser === review.user),
    [currentUser, review.user],
  );

  const handleImgError = () => {
    setImgSrc("/items/placeholder.jpeg");
  };

  return (
    <Card className="shadow-sm review-card">
      <Card.Body>
        {/* Left: image */}
        <div className="item-image-circle" aria-hidden="true">
          <img
            src={imgSrc}
            alt={review.item ? `${review.item} example` : "Food item"}
            onError={handleImgError}
            className="item-image-photo"
          />
        </div>

        {/* Right: content */}
        <div style={{ flex: 1 }}>
          <div className="d-flex justify-content-between align-items-start mb-1">
            <div>
              <Card.Title as="h3" className="h5 mb-1">
                {review.item}
              </Card.Title>
              <div className="small text-muted">
                {review.hall} ·{" "}
                <span>{formatDate(review.createdAt) || "Unknown time"}</span>
              </div>
            </div>
            <div className="text-end">
              <StarRow rating={review.rating} />
              <div className="small text-muted">{review.rating} / 5</div>
            </div>
          </div>

          {review.text && (
            <Card.Text className="mt-2 mb-2">{review.text}</Card.Text>
          )}

          <div className="d-flex justify-content-between align-items-center">
            <div className="small text-muted">
              <span>Posted by </span>
              <strong>{review.user || "Anonymous"}</strong>{" "}
              {typeof review.wouldOrderAgain === "boolean" && (
                <>
                  ·{" "}
                  <Badge bg={review.wouldOrderAgain ? "success" : "danger"}>
                    {review.wouldOrderAgain
                      ? "Would order again"
                      : "Would not order again"}
                  </Badge>
                </>
              )}
            </div>

            {canDelete && (
              <Button
                type="button"
                size="sm"
                onClick={onDelete}
                aria-label="Delete this review"
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
