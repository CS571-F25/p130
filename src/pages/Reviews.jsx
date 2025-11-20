import { useMemo, useState } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import SearchBar from "../components/SearchBar.jsx";
import ReviewForm from "../components/ReviewForm.jsx";
import ReviewList from "../components/ReviewList.jsx";
import { getImageForItem } from "../data/menu.js";

// starter data
const INITIAL = [
  {
    hall: "Four Lakes Market",
    item: "Cheeseburger",
    rating: 4,
    wouldAgain: true,
    text: "Juicy patty, fresh toppings. Bun a little dry.",
    imageUrl: getImageForItem("Cheeseburger"),
    author: "sample-user"
  },
  {
    hall: "Gordon's Market",
    item: "Chicken Tenders",
    rating: 5,
    wouldAgain: true,
    text: "Crispy and hot, would devour again.",
    imageUrl: getImageForItem("Chicken Tenders"),
    author: "sample-user"
  },
  {
    hall: "Rheta's Market",
    item: "Veggie Burger",
    rating: 3,
    wouldAgain: false,
    text: "Pretty average — good if you're in a rush.",
    imageUrl: getImageForItem("Veggie Burger"),
    author: "sample-user"
  }
];

export default function Reviews({ currentUser }) {
  const [reviews, setReviews] = useState(INITIAL);
  const [hall, setHall] = useState("");
  const [item, setItem] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const h = hall.trim().toLowerCase();
    const i = item.trim().toLowerCase();
    return reviews.filter((r) => {
      const hallOk = !h || r.hall.toLowerCase().includes(h);
      const itemOk = !i || r.item.toLowerCase().includes(i);
      return hallOk && itemOk;
    });
  }, [reviews, hall, item]);

  const addReview = (r) => {
    const withImage = {
      ...r,
      imageUrl: getImageForItem(r.item),
      author: currentUser || "anon"
    };
    setReviews((prev) => [withImage, ...prev]);
    setPage(1);
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
          You must be signed in to add a review. Use the <strong>Sign In</strong>{" "}
          tab first.
        </Alert>
      )}

      <SearchBar
        hall={hall}
        setHall={setHall}
        item={item}
        setItem={setItem}
        onSearch={() => setPage(1)}
      />

      <ReviewList
        reviews={filtered}
        page={page}
        setPage={setPage}
        pageSize={5}
      />

      <ReviewForm
        show={showForm}
        onClose={() => setShowForm(false)}
        onSave={addReview}
      />
    </Container>
  );
}
