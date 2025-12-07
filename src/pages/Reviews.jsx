import { useEffect, useMemo, useState } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import ReviewForm from "../components/ReviewForm.jsx";
import ReviewList from "../components/ReviewList.jsx";
import { getImageForItem } from "../data/menu.js";

const STORAGE_KEY = "uwDiningReviews";

const INITIAL = [
  {
    id: "seed-1",
    hall: "Four Lakes Market",
    item: "Cheeseburger",
    rating: 4,
    wouldAgain: true,
    text: "Juicy patty, fresh toppings. Bun a little dry.",
    author: "sample-user"
  },
  {
    id: "seed-2",
    hall: "Gordon's Market",
    item: "Chicken Tenders",
    rating: 5,
    wouldAgain: true,
    text: "Crispy and hot, would devour again.",
    author: "sample-user"
  },
  {
    id: "seed-3",
    hall: "Rheta's Market",
    item: "Veggie Burger",
    rating: 3,
    wouldAgain: false,
    text: "Pretty average, good if you're in a rush.",
    author: "sample-user"
  }
];

export default function Reviews({ currentUser }) {
  const location = useLocation();

  const [reviews, setReviews] = useState(INITIAL);
  const [hall, setHall] = useState("");
  const [item, setItem] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // pre-select hall when coming from Home
  // inside Reviews.jsx, keep everything as before EXCEPT this useEffect:
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


  const normalizedReviews = useMemo(
    () =>
      reviews.map((r) => ({
        ...r,
        imageUrl: getImageForItem(r.item)
      })),
    [reviews]
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(normalizedReviews)
      );
    } catch {
      // ignore
    }
  }, [normalizedReviews]);

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
        <h2 className="mb-0">Reviews</h2>
        <Button
          onClick={() => canPost && setShowForm(true)}
          disabled={!canPost}
        >
          Add Review
        </Button>
      </div>

      {!canPost && (
        <Alert variant="warning" className="py-2">
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
