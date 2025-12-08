// src/components/ReviewList.jsx
import { useState } from "react";
import { Col, Row, Pagination } from "react-bootstrap";
import ReviewCard from "./ReviewCard.jsx";

const REVIEWS_PER_PAGE = 6;

export default function ReviewList({
  reviews,
  currentUser,
  onDeleteReview,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil(reviews.length / REVIEWS_PER_PAGE)
  );

  const safePage = Math.min(currentPage, totalPages);
  if (safePage !== currentPage) {
    setCurrentPage(safePage);
  }

  const startIdx = (safePage - 1) * REVIEWS_PER_PAGE;
  const pageReviews = reviews.slice(
    startIdx,
    startIdx + REVIEWS_PER_PAGE
  );

  return (
    <>
      <Row className="g-3">
        {pageReviews.map((review) => (
          <Col xs={12} md={6} key={review.id}>
            <ReviewCard
              review={review}
              currentUser={currentUser}
              onDelete={onDeleteReview}
            />
          </Col>
        ))}
        {pageReviews.length === 0 && (
          <Col xs={12}>
            <p className="text-muted mb-0">
              No reviews match your filters yet.
            </p>
          </Col>
        )}
      </Row>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
          <Pagination>
            {Array.from({ length: totalPages }, (_, idx) => {
              const page = idx + 1;
              return (
                <Pagination.Item
                  key={page}
                  active={page === safePage}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Pagination.Item>
              );
            })}
          </Pagination>
        </div>
      )}
    </>
  );
}
