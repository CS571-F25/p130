import { useMemo, useState } from "react";
import { Container, Button } from "react-bootstrap";
import SearchBar from "../components/SearchBar.jsx";
import ReviewForm from "../components/ReviewForm.jsx";
import ReviewList from "../components/ReviewList.jsx";

// starter data so the page looks alive
const INITIAL = [
  {
    hall: "Four Lakes Market",
    item: "Burger",
    rating: 4,
    wouldAgain: true,
    text: "Juicy patty, fresh toppings. Bun a little dry.",
    imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349"
  },
  {
    hall: "Gordon",
    item: "Chicken Tenders",
    rating: 5,
    wouldAgain: true,
    text: "Crispy and hot, would devour again.",
    imageUrl: "https://images.unsplash.com/photo-1625944520301-9a4ac2740d37"
  },
  {
    hall: "Rheta's",
    item: "Veggie Wrap",
    rating: 3,
    wouldAgain: false,
    text: "Healthy but bland. Needs sauce.",
    imageUrl: ""
  }
];

export default function Reviews() {
  const [reviews, setReviews] = useState(INITIAL);
  const [hall, setHall] = useState("");
  const [item, setItem] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const h = hall.trim().toLowerCase();
    const i = item.trim().toLowerCase();
    return reviews.filter(r => {
      const hallOk = !h || r.hall.toLowerCase().includes(h);
      const itemOk = !i || r.item.toLowerCase().includes(i);
      return hallOk && itemOk;
    });
  }, [reviews, hall, item]);

  const addReview = (r) => {
    setReviews(prev => [r, ...prev]);
    setPage(1); // jump to first page so user sees their review
  };

  return (
    <Container className="page">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h2 className="mb-0">Reviews</h2>
        <Button onClick={() => setShowForm(true)}>Add Review</Button>
      </div>

      <SearchBar
        hall={hall} setHall={setHall}
        item={item} setItem={setItem}
        onSearch={() => setPage(1)}
      />

      <ReviewList reviews={filtered} page={page} setPage={setPage} pageSize={5} />

      <ReviewForm
        show={showForm}
        onClose={() => setShowForm(false)}
        onSave={addReview}
      />
    </Container>
  );
}
