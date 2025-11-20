export default function RatingStars({ value = 0 }) {
  const clamped = Math.max(0, Math.min(5, Number(value)));
  const full = "★".repeat(clamped);
  const empty = "☆".repeat(5 - clamped);
  return <span aria-label={`${clamped} out of 5 stars`}>{full}{empty}</span>;
}
