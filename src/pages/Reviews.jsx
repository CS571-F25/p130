// src/pages/Reviews.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Pagination,
  Card,
} from "react-bootstrap";

import ReviewCard from "../components/ReviewCard.jsx";
import ReviewForm from "../components/ReviewForm.jsx";
import { DINING_HALLS, getItemsForHall } from "../data/menu.js";
import { INITIAL_REVIEWS } from "../data/seedReviews.js";
import { getCurrentUserFromCookie } from "../utils/cookies.js";

const STORAGE_KEY = "uw-dining-reviews-v2";
const PAGE_SIZE = 10;

function hydrateInitialReviews() {
  // Normalize seed reviews
  return INITIAL_REVIEWS.map((r, index) => ({
    id: r.id ?? `seed-${index}`,
    hall: r.hall,
    item: r.item,
    rating: Number(r.rating ?? 0),
    text: r.text ?? "",
    // Seed authors use `author`; signed-in users use `user`
    author: r.author ?? r.user ?? undefined,
    user: r.user ?? undefined,
    wouldOrderAgain:
      typeof r.wouldOrderAgain === "boolean"
        ? r.wouldOrderAgain
        : typeof r.wouldAgain === "boolean"
          ? r.wouldAgain
          : false,
    createdAt:
      r.createdAt ??
      new Date(Date.now() - (INITIAL_REVIEWS.length - index) * 3600_000)
        .toISOString(),
  }));
}

function loadStoredReviews() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveStoredReviews(reviews) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  } catch {
    // ignore storage errors
  }
}

export default function Reviews() {
  const [allReviews, setAllReviews] = useState(() => {
    const stored = loadStoredReviews();
    if (stored) return stored;
    const seeded = hydrateInitialReviews();
    saveStoredReviews(seeded);
    return seeded;
  });

  const currentUser = getCurrentUserFromCookie();

  const [hallFilter, setHallFilter] = useState("");
  const [itemFilter, setItemFilter] = useState("");
  const [reviewerQuery, setReviewerQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);

  // When hall changes, reset item filter
  useEffect(() => {
    setItemFilter("");
  }, [hallFilter]);

  // Items available for the selected hall
  const availableItems = useMemo(() => {
    if (!hallFilter) return [];
    return getItemsForHall(hallFilter) ?? [];
  }, [hallFilter]);

  // List of distinct reviewer names, used for hinting (not in placeholder anymore)
  const reviewerOptions = useMemo(() => {
    const names = new Set();
    allReviews.forEach((r) => {
      const name = r.user || r.author;
      if (name) names.add(name);
    });
    return Array.from(names).sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase()),
    );
  }, [allReviews]);

  // Filter + sort reviews
  const filteredReviews = useMemo(() => {
    const q = reviewerQuery.trim().toLowerCase();
    let list = [...allReviews];

    // Newest first
    list.sort((a, b) => {
      const da = new Date(a.createdAt).getTime() || 0;
      const db = new Date(b.createdAt).getTime() || 0;
      return db - da;
    });

    if (hallFilter) {
      list = list.filter((r) => r.hall === hallFilter);
    }
    if (itemFilter) {
      list = list.filter((r) => r.item === itemFilter);
    }
    if (q) {
      list = list.filter((r) => {
        const reviewerName = (r.user || r.author || "").toLowerCase();
        return reviewerName.includes(q);
      });
    }

    return list;
  }, [allReviews, hallFilter, itemFilter, reviewerQuery]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredReviews.length / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const pageReviews = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredReviews.slice(start, start + PAGE_SIZE);
  }, [filteredReviews, page]);

  const handleAddReview = (newReview) => {
    // newReview comes from ReviewForm and already has:
    // hall, item, rating, text, wouldOrderAgain, user, createdAt
    const reviewWithMeta = {
      ...newReview,
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      author: newReview.user ?? currentUser ?? "Anonymous",
    };

    setAllReviews((prev) => {
      const updated = [reviewWithMeta, ...prev];
      saveStoredReviews(updated);
      return updated;
    });

    setShowForm(false);
    setPage(1);
  };

  const handleDeleteReview = (id) => {
    setAllReviews((prev) => {
      const updated = prev.filter((r) => r.id !== id);
      saveStoredReviews(updated);
      return updated;
    });
  };

  const handleClearFilters = () => {
    setHallFilter("");
    setItemFilter("");
    setReviewerQuery("");
    setPage(1);
  };

  return (
    <Container className="py-4">
      <header className="mb-4">
        <h1 className="mb-2">Dining Reviews</h1>
        <p className="text-muted mb-0">
          Browse, filter, and contribute reviews of UW–Madison dining hall
          items.
        </p>
      </header>

      {/* Filters + Add Review */}
      <Card className="mb-4">
        <Card.Body>
          <Row className="gy-3 align-items-end">
            <Col xs={12} md={4}>
              <Form.Group controlId="filterHall">
                <Form.Label>Dining hall</Form.Label>
                <Form.Select
                  value={hallFilter}
                  onChange={(e) => {
                    setHallFilter(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">All halls</option>
                  {DINING_HALLS.map((hall) => (
                    <option key={hall} value={hall}>
                      {hall}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={4}>
              <Form.Group controlId="filterItem">
                <Form.Label>Item</Form.Label>
                <Form.Select
                  value={itemFilter}
                  onChange={(e) => {
                    setItemFilter(e.target.value);
                    setPage(1);
                  }}
                  disabled={!hallFilter}
                >
                  <option value="">
                    {hallFilter ? "All items at this hall" : "Select a hall first"}
                  </option>
                  {availableItems.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={4}>
              <Form.Group controlId="filterReviewer">
                <Form.Label>Reviewer</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  value={reviewerQuery}
                  onChange={(e) => {
                    setReviewerQuery(e.target.value);
                    setPage(1);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <Button
              variant="outline-danger"
              type="button"
              onClick={handleClearFilters}
            >
              Clear filters
            </Button>

            {currentUser ? (
              <Button
                type="button"
                onClick={() => setShowForm((open) => !open)}
                aria-expanded={showForm}
              >
                {showForm ? "Hide review form" : "Add a review"}
              </Button>
            ) : (
              <Button
                type="button"
                disabled
                className="btn-outline-danger"
              >
                Sign in to add a review
              </Button>
            )}
          </div>

          {showForm && currentUser && (
            <div className="mt-3">
              <ReviewForm
                currentUser={currentUser}
                onSubmit={handleAddReview}
                onCancel={() => setShowForm(false)}
              />
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Reviews list */}
      {pageReviews.length === 0 ? (
        <p className="text-muted">No reviews match your filters.</p>
      ) : (
        <>
          <Row className="gy-3">
            {pageReviews.map((review) => (
              <Col xs={12} md={6} key={review.id}>
                <ReviewCard
                  review={review}
                  currentUser={currentUser}
                  onDelete={() => handleDeleteReview(review.id)}
                />
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.First
                  disabled={page === 1}
                  onClick={() => setPage(1)}
                />
                <Pagination.Prev
                  disabled={page === 1}
                  onClick={() =>
                    setPage((p) => Math.max(1, p - 1))
                  }
                />
                {Array.from({ length: totalPages }, (_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <Pagination.Item
                      key={pageNum}
                      active={pageNum === page}
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </Pagination.Item>
                  );
                })}
                <Pagination.Next
                  disabled={page === totalPages}
                  onClick={() =>
                    setPage((p) => Math.min(totalPages, p + 1))
                  }
                />
                <Pagination.Last
                  disabled={page === totalPages}
                  onClick={() => setPage(totalPages)}
                />
              </Pagination>
            </div>
          )}
        </>
      )}
    </Container>
  );
}
