// src/pages/Menus.jsx
import { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import HallMenuStats from "../components/HallMenuStats.jsx";
import CurrentMenuSection from "../components/CurrentMenuSection.jsx";
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
        imageUrl: getImageForItem(r.item),
      })),
    [reviews]
  );

  return (
    <Container className="page">
      <h1 className="h2">Menus &amp; Ratings</h1>
      <p className="text-muted">
        Explore UW–Madison dining options, see a sample of what might be
        served for different meals, and check how students rate each item.
        Use this page to plan where to eat, then follow the Nutrislice links
        for official menus and nutrition details.
      </p>

      {/* Nutrislice-inspired "Current Menu" style section */}
      <CurrentMenuSection reviews={normalizedReviews} />

      {/* Existing per-hall menu + ratings overview */}
      <section
        aria-labelledby="menus-ratings-by-hall-heading"
        className="mt-4"
      >
        <h2 id="menus-ratings-by-hall-heading" className="h3 mb-3">
          Menus and Ratings by Dining Hall
        </h2>
        <p className="text-muted">
          This section shows a snapshot of core items at each dining hall,
          along with average ratings and how many reviewers say they would
          order each item again. Click an item name to jump into reviews
          filtered for that hall and item.
        </p>
        <HallMenuStats reviews={normalizedReviews} />
      </section>
    </Container>
  );
}
