// src/components/UserStatsSummary.jsx
import { Card, Row, Col } from "react-bootstrap";

export default function UserStatsSummary({ currentUser, stats }) {
  const { totalReviews, uniqueHalls, avgRating } = stats;

  return (
    <Card className="mb-3">
      <Card.Body>
        <h2 className="h4 mb-3">Your Review Summary</h2>
        <p className="mb-3">
          Signed in as <strong>{currentUser}</strong>. These stats only
          include reviews written by you on this site.
        </p>
        <Row>
          <Col xs={12} md={4} className="mb-3 mb-md-0">
            <div className="d-flex flex-column">
              <span className="text-muted small text-uppercase">
                Total reviews
              </span>
              <span className="fs-3 fw-bold">{totalReviews}</span>
            </div>
          </Col>
          <Col xs={12} md={4} className="mb-3 mb-md-0">
            <div className="d-flex flex-column">
              <span className="text-muted small text-uppercase">
                Dining halls reviewed
              </span>
              <span className="fs-3 fw-bold">{uniqueHalls}</span>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="d-flex flex-column">
              <span className="text-muted small text-uppercase">
                Your avg. rating
              </span>
              <span className="fs-3 fw-bold">
                {avgRating === "n/a" ? "n/a" : `${avgRating}/5`}
              </span>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
