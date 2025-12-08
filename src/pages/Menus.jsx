import { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import HallMenuStats from "../components/HallMenuStats.jsx";
import { getImageForItem } from "../data/menu.js";
import { INITIAL_REVIEWS } from "../data/seedReviews.js";

const STORAGE_KEY = "uwDiningReviews";

export default function Menus() {
  const [reviews, setReviews] = useState([]);

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
      // ignore and keep seeds
    }

    setReviews([...INITIAL_REVIEWS, ...userReviews]);
  }, []);

  const normalizedReviews = useMemo(
    () =>
      reviews.map((r) => ({
        ...r,
        imageUrl: getImageForItem(r.item)
      })),
    [reviews]
  );

  return (
    <Container className="page">
      <h1 className="h2">Menus &amp; Ratings</h1>
      <p className="text-muted">
        Browse the core menu items for each dining hall, see their average
        ratings and how many students say they would order them again, and
        click an item to jump directly to its reviews.
      </p>
      <HallMenuStats reviews={normalizedReviews} />
    </Container>
  );
}
