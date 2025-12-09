// src/components/ReviewList.jsx
import React, { useMemo, useState } from "react";
import { Row, Col, Pagination } from "react-bootstrap";
import ReviewCard from "./ReviewCard.jsx";

const REVIEWS_PER_PAGE = 10;

export default function ReviewList({ reviews, currentUser, onDeleteReview }) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil((reviews?.length || 0) / REVIEWS_PER_PAGE),
  );

  const paginated = useMemo(() => {
    if (!Array.isArray(reviews)) return [];
    const start = (page - 1) * REVIEWS_PER_PAGE;
    const end = start + REVIEWS_PER_PAGE;
    return reviews.slice(start, end);
  }, [page, reviews]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <>
      <Row className="g-3">
        {paginated.map((review) => (
          <Col md={6} key={review.id}>
            <ReviewCard
              review={review}
              currentUser={currentUser}
              onDelete={() => onDeleteReview && onDeleteReview(review.id)}
            />
          </Col>
        ))}
      </Row>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination className="pagination-red">
            <Pagination.Prev
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            />
            {Array.from({ length: totalPages }).map((_, idx) => {
              const p = idx + 1;
              return (
                <Pagination.Item
                  key={p}
                  active={p === page}
                  onClick={() => handlePageChange(p)}
                >
                  {p}
                </Pagination.Item>
              );
            })}
            <Pagination.Next
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            />
          </Pagination>
        </div>
      )}
    </>
  );
}
