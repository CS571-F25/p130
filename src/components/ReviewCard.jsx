import { Card } from "react-bootstrap";
import RatingStars from "./RatingStars.jsx";

export default function ReviewCard({ review }) {
  const { hall, item, rating, text, wouldAgain, imageUrl, author = "anon" } = review;

  return (
    <Card className="mb-3">
      {imageUrl ? (
        <Card.Img variant="top" src={imageUrl} alt={`${item}`} />
      ) : null}
      <Card.Body>
        <Card.Title className="mb-2">
          {hall} — {item}
        </Card.Title>
        <div className="mb-2">
          <strong>Rating:</strong> <RatingStars value={rating} />
        </div>
        <div className="mb-2">
          <strong>Would order again?</strong> {wouldAgain ? "Yes" : "No"}
        </div>
        {text ? <Card.Text className="mb-2">{text}</Card.Text> : null}
        <small className="text-muted">by {author}</small>
      </Card.Body>
    </Card>
  );
}
