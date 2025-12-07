// src/pages/Menus.jsx
import { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import HallMenuStats from "../components/HallMenuStats.jsx";
import { getImageForItem } from "../data/menu.js";

const STORAGE_KEY = "uwDiningReviews";

// re-use the same seed reviews so stats still have some data
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

export default function Menus() {
  const [reviews, setReviews] = useState(INITIAL);

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
      <h2>Menus and Ratings Overview</h2>
      <p className="text-muted">
        Use this page to jump to the current Nutrislice menu for each dining
        hall and see how students have rated the core items on this site,
        including average rating and how many people say they would order it
        again.
      </p>
      <HallMenuStats reviews={normalizedReviews} />
    </Container>
  );
}
