import { Card, Row, Col, Image, Button } from "react-bootstrap";
import RatingStars from "./RatingStars.jsx";

export default function ReviewCard({ review, currentUser, onDelete }) {
  const {
    hall,
    item,
    rating,
    text,
    wouldAgain,
    imageUrl,
    author = "anon"
  } = review;

  const canDelete = currentUser && currentUser === author;

  return (
    <Card className="mb-3">
      <Card.Body>
        <Row>
          <Col xs={3} md={2} className="d-flex align-items-center">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={item}
                thumbnail
                style={{
                  maxHeight: "80px",
                  objectFit: "cover",
                  width: "100%"
                }}
              />
            ) : null}
          </Col>
          <Col xs={9} md={10}>
            <div className="d-flex justify-content-between align-items-start">
              <Card.Title className="mb-2">
                {hall} — {item}
              </Card.Title>
              {canDelete && (
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={onDelete}
                >
                  Delete
                </Button>
              )}
            </div>
            <div className="mb-1">
              <strong>Rating:</strong> <RatingStars value={rating} />
            </div>
            <div className="mb-1">
              <strong>Would order again?</strong> {wouldAgain ? "Yes" : "No"}
            </div>
            {text ? <Card.Text className="mb-1">{text}</Card.Text> : null}
            <small className="text-muted">by {author}</small>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
