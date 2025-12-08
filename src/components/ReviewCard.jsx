import { Card, Button } from "react-bootstrap";
import RatingStars from "./RatingStars.jsx";

export default function ReviewCard({
  review,
  currentUser,
  onDeleteReview
}) {
  const { hall, item, rating, wouldAgain, text, author, imageUrl } = review;
  const canDelete = currentUser && currentUser === author;

  return (
    <Card className="mb-3">
      <Card.Body className="d-flex">
        {imageUrl && (
          <div className="me-3" style={{ minWidth: "140px" }}>
            <img
              src={imageUrl}
              alt={`Photo of ${item}`}
              style={{
                width: "100%",
                height: "90px",
                objectFit: "cover",
                borderRadius: "4px"
              }}
            />
          </div>
        )}
        <div className="flex-grow-1">
          <Card.Title as="h2" className="h5 mb-2">
            {hall} — {item}
          </Card.Title>

          <div className="mb-1">
            <strong>Rating:</strong>{" "}
            <RatingStars rating={rating} /> ({rating}/5)
          </div>
          <div className="mb-1">
            <strong>Would order again?</strong> {wouldAgain ? "Yes" : "No"}
          </div>
          {text && <Card.Text className="mb-1">{text}</Card.Text>}

          <div className="d-flex justify-content-between align-items-center mt-1">
            <small className="text-muted">by {author}</small>
            {canDelete && (
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => onDeleteReview?.(review.id)}
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
