// src/pages/SampleMenu.jsx
import { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import CurrentMenuSection from "../components/CurrentMenuSection.jsx";
import { getImageForItem } from "../data/menu.js";
import { INITIAL_REVIEWS } from "../data/seedReviews.js";

const STORAGE_KEY = "uwDiningReviews";

export default function SampleMenu() {
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
      <h1 className="h2">Sample Daily Menu</h1>
      <p className="text-muted">
        This page shows a Nutrislice-inspired sample menu using items and
        ratings from this site. Select a dining hall and meal to see what a
        typical lineup might look like, along with how UW students rate each
        item. For official menus and nutrition details, follow the Nutrislice
        links.
      </p>

      <CurrentMenuSection reviews={normalizedReviews} />
    </Container>
  );
}
