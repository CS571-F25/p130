// src/components/RatingStars.jsx

// Simple colored star display for ratings like 3.5 / 5.
// Uses UW red for filled stars and a light gray for empty stars.

export default function RatingStars({ rating, outOf = 5 }) {
  const value = Number(rating) || 0;
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;

  const stars = [];

  for (let i = 1; i <= outOf; i++) {
    let type = "empty";
    if (i <= full) {
      type = "full";
    } else if (i === full + 1 && hasHalf) {
      type = "half";
    }

    let char = "★";
    let color = "var(--uw-primary)";
    let opacity = 1;

    if (type === "empty") {
      color = "#d1d5db"; // light gray
      opacity = 1;
    } else if (type === "half") {
      color = "var(--uw-primary)";
      opacity = 0.65;
    }

    stars.push(
      <span
        key={i}
        aria-hidden="true"
        style={{
          color,
          opacity,
          marginRight: "2px",
          fontSize: "1rem",
        }}
      >
        {char}
      </span>
    );
  }

  return (
    <span
      role="img"
      aria-label={`${value} out of ${outOf} stars`}
      style={{ whiteSpace: "nowrap" }}
    >
      {stars}
    </span>
  );
}
