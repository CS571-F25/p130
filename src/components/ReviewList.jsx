import { Pagination } from "react-bootstrap";
import ReviewCard from "./ReviewCard.jsx";

export default function ReviewList({
  reviews,
  page,
  setPage,
  pageSize,
  currentUser,
  onDeleteReview
}) {
  const total = reviews.length;
  const pageSizeSafe = pageSize || 5;
  const totalPages = Math.max(1, Math.ceil(total / pageSizeSafe));
  const currentPage = Math.min(page, totalPages);

  const startIndex = (currentPage - 1) * pageSizeSafe;
  const visible = reviews.slice(startIndex, startIndex + pageSizeSafe);

  const handlePageChange = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage?.(p);
  };

  const headingText =
    total === 0
      ? "No reviews match these filters yet."
      : `Showing ${startIndex + 1}-${startIndex + visible.length} of ${total} review${
          total !== 1 ? "s" : ""
        }`;

  return (
    <section aria-label="Dining hall reviews list">
      <h2 className="h4">{headingText}</h2>

      <div className="mt-3 mb-3">
        {visible.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            currentUser={currentUser}
            onDeleteReview={onDeleteReview}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination aria-label="Review pages">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Pagination.Item
              key={p}
              active={p === currentPage}
              onClick={() => handlePageChange(p)}
            >
              {p}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}
    </section>
  );
}
