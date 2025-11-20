import { useMemo } from "react";
import { Pagination } from "react-bootstrap";
import ReviewCard from "./ReviewCard.jsx";

export default function ReviewList({
  reviews,
  page,
  setPage,
  pageSize = 5,
  currentUser,
  onDeleteReview
}) {
  const totalPages = Math.max(1, Math.ceil(reviews.length / pageSize));

  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return reviews.slice(start, start + pageSize);
  }, [reviews, page, pageSize]);

  const handleChange = (next) => {
    if (next >= 1 && next <= totalPages) setPage(next);
  };

  return (
    <>
      {pageData.map((r) => (
        <ReviewCard
          key={r.id ?? `${r.hall}-${r.item}-${r.author}`}
          review={r}
          currentUser={currentUser}
          onDelete={() => onDeleteReview?.(r.id)}
        />
      ))}

      <div className="d-flex justify-content-center">
        <Pagination className="mt-2">
          <Pagination.Prev
            onClick={() => handleChange(page - 1)}
            disabled={page === 1}
          />
          {[...Array(totalPages)].map((_, idx) => (
            <Pagination.Item
              key={idx}
              active={page === idx + 1}
              onClick={() => handleChange(idx + 1)}
            >
              {idx + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handleChange(page + 1)}
            disabled={page === totalPages}
          />
        </Pagination>
      </div>
    </>
  );
}
