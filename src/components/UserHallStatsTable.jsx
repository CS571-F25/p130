// src/pages/HallStatsOverview.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Container, Card, Row, Col, Badge } from "react-bootstrap";
import { INITIAL_REVIEWS } from "../data/seedReviews.js";

const STORAGE_KEY = "uwDiningAllReviews";

function safeLoadReviews() {
  if (typeof window === "undefined") return INITIAL_REVIEWS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_REVIEWS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0
      ? parsed
      : INITIAL_REVIEWS;
  } catch {
    return INITIAL_REVIEWS;
  }
}

export default function HallStatsOverview() {
  const [allReviews, setAllReviews] = useState(INITIAL_REVIEWS);

  useEffect(() => {
    setAllReviews(safeLoadReviews());
  }, []);

  const hallStats = useMemo(() => {
    const byHall = new Map();

    for (const r of allReviews) {
      if (!r.hall) continue;
      if (!byHall.has(r.hall)) {
        byHall.set(r.hall, {
          hall: r.hall,
          count: 0,
          sumRating: 0,
          yesCount: 0,
        });
      }
      const entry = byHall.get(r.hall);
      entry.count += 1;
      entry.sumRating += Number(r.rating || 0);
      if (r.wouldOrderAgain) entry.yesCount += 1;
    }

    return Array.from(byHall.values())
      .map((h) => ({
        ...h,
        avgRating: h.count > 0 ? (h.sumRating / h.count).toFixed(2) : "N/A",
        yesPct:
          h.count > 0 ? Math.round((h.yesCount / h.count) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);
  }, [allReviews]);

  return (
    <Container className="py-4">
      <h1 className="mb-3">Hall Stats Overview</h1>
      <p className="text-muted mb-4">
        See how different UW–Madison dining halls are performing based on all
        reviews stored on this browser, including seeded example reviews and
        any you&apos;ve added.
      </p>

      {hallStats.length === 0 ? (
        <Card className="shadow-sm">
          <Card.Body>
            <p className="mb-0 text-muted">
              No reviews are available yet. Once reviews are added, this page
              will summarize each dining hall.
            </p>
          </Card.Body>
        </Card>
      ) : (
        <Row className="g-3">
          {hallStats.map((h) => (
            <Col key={h.hall} md={6} lg={4}>
              <Card className="shadow-sm h-100 hall-stats-card">
                <Card.Body>
                  <Card.Title as="h2" className="h5 d-flex justify-content-between">
                    <span>{h.hall}</span>
                    <Badge bg="danger">{h.count} reviews</Badge>
                  </Card.Title>
                  <p className="mb-1">
                    <strong>Avg rating:</strong> {h.avgRating} / 5
                  </p>
                  <p className="mb-0">
                    <strong>Would order again:</strong>{" "}
                    {h.yesPct}% of reviews are{" "}
                    <span className="text-danger">Yes</span>.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
