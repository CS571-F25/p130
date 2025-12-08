// src/pages/MyStats.jsx
import { useEffect, useMemo, useState } from "react";
import { Alert, Container } from "react-bootstrap";
import UserStatsSummary from "../components/UserStatsSummary.jsx";
import UserHallStatsTable from "../components/UserHallStatsTable.jsx";

const STORAGE_KEY = "uwDiningReviews";

function computeStatsForUser(reviews, currentUser) {
  const mine = reviews.filter((r) => r.author === currentUser);

  if (mine.length === 0) {
    return {
      totalReviews: 0,
      uniqueHalls: 0,
      avgRating: "n/a",
      hallStats: [],
    };
  }

  const totalReviews = mine.length;
  const uniqueHallSet = new Set(mine.map((r) => r.hall));
  const uniqueHalls = uniqueHallSet.size;

  let sumRating = 0;
  const hallMap = new Map();

  for (const r of mine) {
    const ratingNum = Number(r.rating) || 0;
    sumRating += ratingNum;

    if (!hallMap.has(r.hall)) {
      hallMap.set(r.hall, {
        hall: r.hall,
        count: 0,
        sumRating: 0,
        yesAgain: 0,
      });
    }
    const entry = hallMap.get(r.hall);
    entry.count += 1;
    entry.sumRating += ratingNum;
    if (r.wouldAgain) {
      entry.yesAgain += 1;
    }
  }

  const avgRating = (sumRating / totalReviews).toFixed(1);

  const hallStats = Array.from(hallMap.values())
    .map((h) => ({
      hall: h.hall,
      count: h.count,
      avgRating: h.sumRating / h.count,
      percentAgain:
        h.count === 0 ? 0 : (h.yesAgain / h.count) * 100,
    }))
    .sort((a, b) => a.hall.localeCompare(b.hall));

  return {
    totalReviews,
    uniqueHalls,
    avgRating,
    hallStats,
  };
}

export default function MyStats({ currentUser }) {
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setUserReviews([]);
        return;
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setUserReviews(parsed);
      } else {
        setUserReviews([]);
      }
    } catch {
      setUserReviews([]);
    }
  }, []);

  const stats = useMemo(
    () => computeStatsForUser(userReviews, currentUser),
    [userReviews, currentUser]
  );

  return (
    <Container className="page">
      <h1 className="h2">My Dining Stats</h1>
      <p className="text-muted">
        See a personalized summary of your UW dining reviews: how many items
        you&apos;ve rated, which halls you visit the most, and how generous
        your ratings really are.
      </p>

      {!currentUser && (
        <Alert variant="warning" className="mt-2">
          You must be signed in to see your stats. Use the{" "}
          <strong>Sign up / Login</strong> page to sign in, then come back
          here.
        </Alert>
      )}

      {currentUser && stats.totalReviews === 0 && (
        <Alert variant="info" className="mt-2">
          You&apos;re signed in as <strong>{currentUser}</strong>, but you
          haven&apos;t written any reviews yet. Once you add reviews, this
          page will show your personal stats.
        </Alert>
      )}

      {currentUser && stats.totalReviews > 0 && (
        <>
          <UserStatsSummary currentUser={currentUser} stats={stats} />
          <UserHallStatsTable hallStats={stats.hallStats} />
        </>
      )}
    </Container>
  );
}
