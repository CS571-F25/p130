// src/pages/Reviews.jsx
import { useEffect, useMemo, useState } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import SearchBar from "../components/SearchBar.jsx";
import ReviewList from "../components/ReviewList.jsx";
import ReviewForm from "../components/ReviewForm.jsx";
import { DINING_HALLS } from "../data/menu.js";
import { INITIAL_REVIEWS } from "../data/seedReviews.js";

const STORAGE_KEY = "uwDiningReviews";

function loadUserReviews() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveUserReviews(reviews) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  } catch {
    // ignore
  }
}

export default function Reviews({ currentUser }) {
  const [userReviews, setUserReviews] = useState([]);
  const [hallFilter, setHallFilter] = useState("");
  const [itemFilter, setItemFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setUserReviews(loadUserReviews());
  }, []);

  const allReviews = useMemo(
    () => [...INITIAL_REVIEWS, ...userReviews],
    [userReviews]
  );

  // Items are filtered down to only items at the currently selected hall
  const itemOptions = useMemo(() => {
    const set = new Set();
    allReviews.forEach((r) => {
      if (!r.item) return;
      if (hallFilter && r.hall !== hallFilter) return;
      set.add(r.item);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [allReviews, hallFilter]);

  const filteredReviews = useMemo(() => {
    return allReviews.filter((r) => {
      if (hallFilter && r.hall !== hallFilter) return false;
      if (itemFilter && r.item !== itemFilter) return false;

      // text-based reviewer filter (substring, case-insensitive)
      if (userFilter.trim()) {
        const needle = userFilter.trim().toLowerCase();
        const author = (r.author || "").toLowerCase();
        if (!author.includes(needle)) return false;
      }

      if (searchText.trim()) {
        const needle = searchText.trim().toLowerCase();
        const haystack =
          `${r.hall} ${r.item} ${r.text || ""} ${r.author || ""}`.toLowerCase();
        if (!haystack.includes(needle)) return false;
      }

      return true;
    });
  }, [allReviews, hallFilter, itemFilter, userFilter, searchText]);

  const handleAddReview = (reviewData) => {
    if (!currentUser) return;

    const newReview = {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      hall: reviewData.hall,
      item: reviewData.item,
      rating: Number(reviewData.rating),
      wouldAgain: Boolean(reviewData.wouldAgain),
      text: reviewData.text?.trim() || "",
      author: currentUser,
    };

    setUserReviews((prev) => {
      const updated = [...prev, newReview];
      saveUserReviews(updated);
      return updated;
    });
    setShowForm(false);
  };

  const handleDeleteReview = (id) => {
    // Only delete from userReviews; seeded reviews remain
    setUserReviews((prev) => {
      const updated = prev.filter((r) => r.id !== id);
      saveUserReviews(updated);
      return updated;
    });
  };

  const canPost = Boolean(currentUser);

  return (
    <Container className="page">
      <h1 className="h2">Reviews</h1>
      <p className="text-muted">
        Browse dining hall reviews from UW students, filter by hall, item, or
        reviewer, and share your own experience once you&apos;re signed in.
      </p>

      {!canPost && (
        <Alert variant="warning">
          You must be signed in to post reviews. Use the{" "}
          <strong>Sign up / Login</strong> page to create an account or sign in.
        </Alert>
      )}

      <SearchBar
        diningHalls={DINING_HALLS}
        items={itemOptions}
        // reviewer filter now a text box
        selectedHall={hallFilter}
        onHallChange={setHallFilter}
        selectedItem={itemFilter}
        onItemChange={setItemFilter}
        userFilter={userFilter}
        onUserChange={setUserFilter}
        searchText={searchText}
        onSearchTextChange={setSearchText}
      />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="mb-0 text-muted">
          Showing <strong>{filteredReviews.length}</strong> review
          {filteredReviews.length === 1 ? "" : "s"}.
        </p>
        {canPost && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowForm(true)}
          >
            Add Review
          </Button>
        )}
      </div>

      <ReviewList
        reviews={filteredReviews}
        currentUser={currentUser}
        onDeleteReview={handleDeleteReview}
      />

      <ReviewForm
        show={showForm}
        onHide={() => setShowForm(false)}
        onSave={handleAddReview}
        currentUser={currentUser}
      />
    </Container>
  );
}
