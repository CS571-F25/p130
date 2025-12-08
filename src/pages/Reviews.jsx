import { useEffect, useMemo, useState } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import ReviewForm from "../components/ReviewForm.jsx";
import ReviewList from "../components/ReviewList.jsx";
import { getImageForItem } from "../data/menu.js";
import { INITIAL_REVIEWS } from "../data/seedReviews.js";

const STORAGE_KEY = "uwDiningReviews";

export default function Reviews({ currentUser }) {
  const location = useLocation();

  // We will load seeds + any stored user reviews on mount
  const [reviews, setReviews] = useState([]);
  const [hall, setHall] = useState("");
  const [item, setItem] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);

  // Load INITIAL_REVIEWS + user reviews from localStorage
  useEffect(() => {
    let userReviews = [];

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          userReviews = parsed;
        }
      }
    } catch {
      // ignore parse errors, just use seeds
    }

    setReviews([...INITIAL_REVIEWS, ...userReviews]);
  }, []);

  // Apply navigation state (e.g., when coming from Menus page)
  useEffect(() => {
    const state = location.state || {};
    if (state.hall) {
      setHall(state.hall);
    }
    if (state.item) {
      setItem(state.item);
    }
    if (state.hall || state.item) {
      setPage(1);
    }
  }, [location.state]);

  // Attach images for display
  const normalizedReviews = useMemo(
    () =>
      reviews.map((r) => ({
        ...r,
        imageUrl: getImageForItem(r.item)
      })),
    [reviews]
  );

  // Persist only non-seed (user-created) reviews to localStorage
  useEffect(() => {
    try {
      const userOnly = reviews.filter(
        (r) => !String(r.id).startsWith("seed-")
      );
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(userOnly));
    } catch {
      // ignore storage errors
    }
  }, [reviews]);

  // Filtering by hall + item
  const filtered = useMemo(() => {
    const h = hall.trim().toLowerCase();
    const i = item.trim().toLowerCase();
    return normalizedReviews.filter((r) => {
      const hallOk = !h || r.hall.toLowerCase() === h;
      const itemOk = !i || r.item.toLowerCase().includes(i);
      return hallOk && itemOk;
    });
  }, [normalizedReviews, hall, item]);

  const addReview = (r) => {
    const makeId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now() + Math.random());

    const withMeta = {
      ...r,
      id: makeId,
      author: currentUser || "anon"
    };
    setReviews((prev) => [withMeta, ...prev]);
    setPage(1);
  };

  const handleDeleteReview = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const canPost = Boolean(currentUser);

  return (
    <Container className="page">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h1 className="h2 mb-0">Reviews</h1>
        <Button
          onClick={() => canPost && setShowForm(true)}
          disabled={!canPost}
        >
          Add Review
        </Button>
      </div>

      {!canPost && (
        <Alert variant="warning" className="py-2" role="status">
          You must be signed in to add a review. Use the{" "}
          <strong>Sign up / Login</strong> tab first.
        </Alert>
      )}

      <SearchBar
        hall={hall}
        setHall={(hVal) => {
          setHall(hVal);
          setPage(1);
        }}
        item={item}
        setItem={(iVal) => {
          setItem(iVal);
          setPage(1);
        }}
        onClear={() => setPage(1)}
      />

      <ReviewList
        reviews={filtered}
        page={page}
        setPage={setPage}
        pageSize={5}
        currentUser={currentUser}
        onDeleteReview={handleDeleteReview}
      />

      <ReviewForm
        show={showForm}
        onClose={() => setShowForm(false)}
        onSave={addReview}
      />
    </Container>
  );
}
