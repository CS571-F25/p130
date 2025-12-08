// src/components/ReviewCard.jsx
import { Card, Button, Badge } from "react-bootstrap";
import RatingStars from "./RatingStars.jsx";
import { getImageForItem } from "../data/menu.js";

export default function ReviewCard({ review, currentUser, onDelete }) {
  const canDelete =
    currentUser &&
    review.author &&
    review.author === currentUser &&
    !String(review.id).startsWith("seed-");

  const handleDelete = () => {
    if (!canDelete) return;
    onDelete?.(review.id);
  };

  const imageUrl = getImageForItem(review.item);

  return (
    <Card className="review-card h-100">
      <Card.Body className="d-flex">
        <div className="item-image-circle" aria-hidden="true">
          <img
            src={imageUrl}
            alt={review.item}
            className="item-image-photo"
          />
        </div>
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-start mb-1">
            <div>
              <h2 className="h5 mb-0">{review.item}</h2>
              <p className="mb-1 text-muted small">{review.hall}</p>
            </div>
            <div className="text-end">
              <RatingStars rating={review.rating} />
              <div className="small text-muted">
                {review.rating.toFixed
                  ? review.rating.toFixed(1)
                  : review.rating}
                /5
              </div>
            </div>
          </div>

          {review.text && <p className="mb-2">{review.text}</p>}

          <div className="d-flex justify-content-between align-items-center">
            <div className="small text-muted">
              <span>
                By <strong>{review.author || "Anonymous"}</strong>
              </span>
              {" • "}
              <span>
                Would order again:{" "}
                {review.wouldAgain ? (
                  <Badge bg="success">Yes</Badge>
                ) : (
                  <Badge bg="secondary">No</Badge>
                )}
              </span>
            </div>
            {canDelete && (
              <Button
                variant="outline-danger"
                size="sm"
                onClick={handleDelete}
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
