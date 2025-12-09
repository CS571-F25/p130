// src/pages/MyStats.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Container, Card, Row, Col, Badge } from "react-bootstrap";
import { getCurrentUserFromCookie } from "../utils/cookies.js";

const STORAGE_KEY = "uwDiningAllReviews";

function safeLoadReviews() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function MyStats() {
  const [allReviews, setAllReviews] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setAllReviews(safeLoadReviews());
    setCurrentUser(getCurrentUserFromCookie() || null);
  }, []);

  const myReviews = useMemo(
    () => (currentUser ? allReviews.filter((r) => r.user === currentUser) : []),
    [allReviews, currentUser],
  );

  const totalReviews = myReviews.length;
  const avgRating =
    totalReviews > 0
      ? (
          myReviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) /
          totalReviews
        ).toFixed(2)
      : "N/A";

  const orderAgainYes = myReviews.filter((r) => r.wouldOrderAgain).length;
  const orderAgainNo = totalReviews - orderAgainYes;
  const orderAgainYesPct =
    totalReviews > 0 ? Math.round((orderAgainYes / totalReviews) * 100) : 0;

  const hallsBreakdown = useMemo(() => {
    const map = new Map();
    for (const r of myReviews) {
      if (!r.hall) continue;
      if (!map.has(r.hall)) {
        map.set(r.hall, { hall: r.hall, count: 0, sumRating: 0 });
      }
      const entry = map.get(r.hall);
      entry.count += 1;
      entry.sumRating += Number(r.rating || 0);
    }
    return Array.from(map.entries())
      .map(([hall, { count, sumRating }]) => ({
        hall,
        count,
        avg: (sumRating / count).toFixed(2),
      }))
      .sort((a, b) => b.count - a.count);
  }, [myReviews]);

  return (
    <Container className="py-4">
      <h1 className="mb-3">My Stats</h1>
      <p className="text-muted mb-4">
        See an overview of your own dining reviews, including how often you
        would order items again and how different dining halls compare for you.
      </p>

      {!currentUser ? (
        <Card className="shadow-sm">
          <Card.Body>
            <p className="mb-0">
              <strong>You must be signed in to view your stats.</strong> Use the
              &quot;Sign up / Login&quot; tab in the navigation bar to sign in,
              then return here.
            </p>
          </Card.Body>
        </Card>
      ) : (
        <>
          <Row className="g-3 mb-3">
            <Col md={4}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title as="h2" className="h5">
                    Total reviews
                  </Card.Title>
                  <p className="display-6 mb-0">{totalReviews}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title as="h2" className="h5">
                    Average rating
                  </Card.Title>
                  <p className="display-6 mb-0">{avgRating}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title as="h2" className="h5">
                    Would order again
                  </Card.Title>
                  <p className="mb-1">
                    <Badge bg="danger" className="me-2">
                      Yes: {orderAgainYes}
                    </Badge>
                    <Badge bg="secondary">No: {orderAgainNo}</Badge>
                  </p>
                  <p className="mb-0 text-muted small">
                    {totalReviews > 0
                      ? `${orderAgainYesPct}% of your reviews are "Yes".`
                      : "No reviews yet."}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title as="h2" className="h5">
                By dining hall
              </Card.Title>
              {hallsBreakdown.length === 0 ? (
                <p className="mb-0 text-muted">
                  You haven&apos;t written any reviews yet. Once you do,
                  you&apos;ll see how each hall scores for you here.
                </p>
              ) : (
                <div className="table-responsive mt-2">
                  <table className="table align-middle mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Dining hall</th>
                        <th scope="col">Your reviews</th>
                        <th scope="col">Your avg. rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hallsBreakdown.map((h) => (
                        <tr key={h.hall}>
                          <td>{h.hall}</td>
                          <td>{h.count}</td>
                          <td>{h.avg}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
}
