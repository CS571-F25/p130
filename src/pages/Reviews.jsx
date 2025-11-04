import { useState } from "react";

export default function Reviews() {
  // super barebones placeholders for future features
  const [hall, setHall] = useState("");
  const [item, setItem] = useState("");

  return (
    <div className="page">
      <h2>Reviews</h2>

      {/* Simple search/filter form (no functionality yet) */}
      <form className="row g-2 mb-3">
        <div className="col-sm-5">
          <input
            className="form-control"
            placeholder="Dining hall (e.g., Four Lakes Market)"
            value={hall}
            onChange={(e) => setHall(e.target.value)}
          />
        </div>
        <div className="col-sm-5">
          <input
            className="form-control"
            placeholder="Item (e.g., burger)"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </div>
        <div className="col-sm-2">
          <button type="button" className="btn btn-primary w-100">Search</button>
        </div>
      </form>

      {/* Placeholder list with a single card example */}
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Four Lakes Market — Burger</h5>
          <p className="card-text mb-1"><strong>Rating:</strong> ★★★★☆ (4/5)</p>
          <p className="card-text mb-1"><strong>Would order again?</strong> Yes</p>
          <p className="card-text">Juicy patty, fresh toppings. Bun a little dry.</p>
        </div>
      </div>

      <p className="text-muted">Pagination and live updates coming soon.</p>
    </div>
  );
}
