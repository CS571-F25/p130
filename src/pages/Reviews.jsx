import React, { useMemo, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Pagination,
  Badge,
} from "react-bootstrap";
import ReviewList from "../components/ReviewList.jsx";
import ReviewForm from "../components/ReviewForm.jsx";
import {
  DINING_HALLS,
  getItemsForHall,
  ITEM_NAMES,
} from "../data/menu.js";
import { INITIAL_REVIEWS } from "../data/seedReviews.js";
import "../reviews-pagination.css";

const REVIEWS_PER_PAGE = 5;

export default function Reviews({ currentUser }) {
  const [reviews, setReviews] = useState([]);
  const [selectedHall, setSelectedHall] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [reviewerSearch, setReviewerSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setReviews(INITIAL_REVIEWS);
  }, []);

  // When hall changes, optionally constrain the item list
  const availableItems = useMemo(
    () => getItemsForHall(selectedHall),
    [selectedHall],
  );

  const handleHallChange = (e) => {
    const hall = e.target.value;
    setSelectedHall(hall);
    // If current item is not served at this hall, clear it
    if (hall && !getItemsForHall(hall).includes(selectedItem)) {
      setSelectedItem("");
    }
    setPage(1);
  };

  const handleItemChange = (e) => {
    setSelectedItem(e.target.value);
    setPage(1);
  };

  const handleReviewerChange = (e) => {
    setReviewerSearch(e.target.value);
    setPage(1);
  };

  const handleAddReview = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
    setPage(1);
  };

  const handleDeleteReview = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      if (selectedHall && r.hall !== selectedHall) return false;
      if (selectedItem && r.item !== selectedItem) return false;
      if (
        reviewerSearch.trim() &&
        !r.username.toLowerCase().includes(reviewerSearch.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [reviews, selectedHall, selectedItem, reviewerSearch]);

  const pageCount = Math.max(
    1,
    Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE),
  );
  const safePage = Math.min(page, pageCount);
  const startIndex = (safePage - 1) * REVIEWS_PER_PAGE;
  const pagedReviews = filteredReviews.slice(
    startIndex,
    startIndex + REVIEWS_PER_PAGE,
  );

  const uwRed = "#c5050c";

  return (
    <Container className="py-4">
      <h1 className="mb-3">Reviews</h1>
      <p className="text-muted mb-4">
        Browse reviews from other students and share your own experiences.
        Filter by dining hall, item, or reviewer to find exactly what you
        care about.
      </p>

      <Row className="mb-4" aria-label="Filters for reviews">
        <Col lg={4} className="mb-3">
          <Form.Group controlId="filterHall">
            <Form.Label>Dining hall</Form.Label>
            <Form.Select
              value={selectedHall}
              onChange={handleHallChange}
              aria-label="Filter by dining hall"
            >
              <option value="">All dining halls</option>
              {DINING_HALLS.map((hall) => (
                <option key={hall} value={hall}>
                  {hall}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col lg={4} className="mb-3">
          <Form.Group controlId="filterItem">
            <Form.Label>Item</Form.Label>
            <Form.Select
              value={selectedItem}
              onChange={handleItemChange}
              aria-label="Filter by item"
            >
              <option value="">All items</option>
              {availableItems.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col lg={4} className="mb-3">
          <Form.Group controlId="filterReviewer">
            <Form.Label>Reviewer</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search by reviewer (e.g., badgerfan22)"
              value={reviewerSearch}
              onChange={handleReviewerChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title as="h2" className="h4 mb-3">
                Add a review
              </Card.Title>
              {currentUser ? (
                <ReviewForm
                  currentUser={currentUser}
                  onAddReview={handleAddReview}
                  existingReviews={reviews}
                />
              ) : (
                <p className="mb-0">
                  <Badge bg="warning" text="dark">
                    Sign in required
                  </Badge>{" "}
                  You must be signed in to leave a review.
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h2 className="h4 mb-0">All reviews</h2>
            <small className="text-muted">
              Showing {pagedReviews.length} of {filteredReviews.length} matching
              reviews
            </small>
          </div>

          <ReviewList
            reviews={pagedReviews}
            currentUser={currentUser}
            onDeleteReview={handleDeleteReview}
          />

          {pageCount > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <Pagination className="pagination-red">
                {Array.from({ length: pageCount }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <Pagination.Item
                      key={pageNum}
                      active={pageNum === safePage}
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </Pagination.Item>
                  ),
                )}
              </Pagination>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
