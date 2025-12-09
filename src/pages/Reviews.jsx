// src/pages/Reviews.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Badge,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ReviewList from "../components/ReviewList.jsx";
import ReviewForm from "../components/ReviewForm.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { DINING_HALLS, getItemsForHall } from "../data/menu.js";
import { INITIAL_REVIEWS } from "../data/seedReviews.js";
import { getCurrentUserFromCookie } from "../utils/cookies.js";

const STORAGE_KEY = "uwDiningReviews";

function loadStoredReviews() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveStoredReviews(reviews) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  } catch {
    // ignore
  }
}

export default function Reviews({ currentUser: currentUserProp }) {
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState(currentUserProp || null);
  const [allReviews, setAllReviews] = useState(() => {
    const stored = loadStoredReviews();
    // prepend initial reviews so they look older
    return [...INITIAL_REVIEWS, ...stored];
  });

  const [hallFilter, setHallFilter] = useState("");
  const [itemFilter, setItemFilter] = useState("");
  const [reviewerFilter, setReviewerFilter] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Sync from cookie if App hasn't provided a user yet
  useEffect(() => {
    if (currentUserProp) {
      setCurrentUser(currentUserProp);
      return;
    }
    const cookieUser = getCurrentUserFromCookie();
    if (cookieUser) {
      setCurrentUser(cookieUser);
    }
  }, [currentUserProp]);

  // If navigated from Home/Menus with a selected hall/item
  useEffect(() => {
    if (location.state?.hall) {
      setHallFilter(location.state.hall);
    }
    if (location.state?.item) {
      setItemFilter(location.state.item);
    }
  }, [location.state]);

  // Items available for the current hall filter
  const availableItemsForFilter = useMemo(
    () => (hallFilter ? getItemsForHall(hallFilter) : []),
    [hallFilter],
  );

  // Filter + sort (oldest to newest as requested)
  const filteredReviews = useMemo(() => {
    return allReviews
      .filter((r) => {
        if (hallFilter && r.hall !== hallFilter) return false;
        if (itemFilter && r.item !== itemFilter) return false;
        if (
          reviewerFilter &&
          !r.user.toLowerCase().includes(reviewerFilter.toLowerCase())
        ) {
          return false;
        }
        return true;
      })
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }, [allReviews, hallFilter, itemFilter, reviewerFilter]);

  const totalMatching = filteredReviews.length;

  const handleAddReview = (newReview) => {
    const storedOnly = allReviews.slice(INITIAL_REVIEWS.length);
    const updatedStored = [...storedOnly, newReview];
    const updatedAll = [...INITIAL_REVIEWS, ...updatedStored];
    setAllReviews(updatedAll);
    saveStoredReviews(updatedStored);
  };

  const handleDeleteReview = (idToDelete) => {
    setAllReviews((prev) => {
      const storedOnly = prev
        .slice(INITIAL_REVIEWS.length)
        .filter((r) => r.id !== idToDelete);
      const updatedAll = [...INITIAL_REVIEWS, ...storedOnly];
      saveStoredReviews(storedOnly);
      return updatedAll;
    });
  };

  const handleStartAdd = () => setShowForm(true);
  const handleCancelAdd = () => setShowForm(false);

  const handleHallFilterChange = (value) => {
    setHallFilter(value);
    // Reset item filter if it's not in this hall
    if (value && !getItemsForHall(value).includes(itemFilter)) {
      setItemFilter("");
    }
  };

  return (
    <Container className="py-4">
      <h1 className="mb-3">Reviews</h1>
      <p className="text-muted mb-4">
        Browse dining hall reviews, filter by hall, item, or reviewer, and add
        your own experiences when you&apos;re signed in.
      </p>

      {/* Filters */}
      <Card className="shadow-sm mb-3">
        <Card.Body>
          <Row className="g-3">
            <Col md={4}>
              <Form.Group controlId="filterHall">
                <Form.Label>Dining hall</Form.Label>
                <Form.Select
                  value={hallFilter}
                  onChange={(e) => handleHallFilterChange(e.target.value)}
                >
                  <option value="">All dining halls</option>
                  {DINING_HALLS.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="filterItem">
                <Form.Label>Item</Form.Label>
                <Form.Select
                  value={itemFilter}
                  onChange={(e) => setItemFilter(e.target.value)}
                  disabled={!hallFilter}
                >
                  <option value="">All items</option>
                  {availableItemsForFilter.map((it) => (
                    <option key={it} value={it}>
                      {it}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="filterReviewer">
                <Form.Label>Reviewer</Form.Label>
                <SearchBar
                  placeholder="Filter by username..."
                  value={reviewerFilter}
                  onChange={setReviewerFilter}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3 small text-muted">
            Showing{" "}
            <strong>
              {totalMatching}{" "}
              {totalMatching === 1 ? "matching review" : "matching reviews"}
            </strong>
          </div>
        </Card.Body>
      </Card>

      {/* Add review section */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h2 className="h5 mb-1">Add a review</h2>
              <p className="mb-0 text-muted">
                You must be signed in to post. Your reviews are saved locally on
                this browser.
              </p>
            </div>
            {!showForm && (
              <Button
                type="button"
                onClick={handleStartAdd}
                disabled={!currentUser}
              >
                Add review
              </Button>
            )}
          </div>

          {showForm && (
            <ReviewForm
              currentUser={currentUser}
              onAddReview={handleAddReview}
              onCancel={handleCancelAdd}
              initialHall={hallFilter || location.state?.hall || ""}
              initialItem={itemFilter || location.state?.item || ""}
            />
          )}

          {!currentUser && (
            <div className="mt-3 small text-muted">
              <Badge bg="secondary">Note</Badge>{" "}
              Sign in from the &quot;Sign up / Login&quot; tab to post new
              reviews.
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Reviews list (with its own pagination) */}
      <ReviewList
        reviews={filteredReviews}
        currentUser={currentUser}
        onDeleteReview={handleDeleteReview}
      />
    </Container>
  );
}
