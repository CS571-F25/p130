// src/pages/Menus.jsx
import React, { useMemo } from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DINING_HALLS, HALL_ITEMS } from "../data/menu.js";
import { INITIAL_REVIEWS } from "../data/seedReviews.js";

function computeStatsForHall(hallName) {
  const items = HALL_ITEMS[hallName] || [];

  const stats = items.map((itemName) => {
    const matching = INITIAL_REVIEWS.filter(
      (r) => r.hall === hallName && r.item === itemName,
    );
    const count = matching.length;

    if (count === 0) {
      return {
        item: itemName,
        avgRating: null,
        percentAgain: null,
        count: 0,
      };
    }

    const total = matching.reduce((sum, r) => sum + Number(r.rating || 0), 0);
    const avgRating = total / count;

    // Support both wouldOrderAgain (new) and wouldAgain (old)
    const againCount = matching.filter((r) => {
      if (typeof r.wouldOrderAgain === "boolean") {
        return r.wouldOrderAgain;
      }
      if (typeof r.wouldAgain === "boolean") {
        return r.wouldAgain;
      }
      return false;
    }).length;

    const percentAgain = (againCount / count) * 100;

    return {
      item: itemName,
      avgRating,
      percentAgain,
      count,
    };
  });

  return stats;
}

export default function Menus() {
  const navigate = useNavigate();

  const hallStats = useMemo(() => {
    const result = {};
    for (const hall of DINING_HALLS) {
      result[hall] = computeStatsForHall(hall);
    }
    return result;
  }, []);

  const handleItemClick = (hall, item) => {
    navigate("/reviews", { state: { hall, item } });
  };

  return (
    <Container className="py-4">
      <h1 className="mb-3">Hall Stats Overview</h1>
      <p className="text-muted mb-4">
        See a snapshot of how popular core items are at each dining hall based
        on reviews from this site. Click an item name to jump directly to
        reviews filtered for that hall and item.
      </p>

      <h2 className="h4 mb-3">Items by Dining Hall</h2>

      <Row className="g-4">
        {DINING_HALLS.map((hall) => {
          const stats = hallStats[hall] || [];

          return (
            <Col md={6} key={hall}>
              <Card className="shadow-sm h-100 hall-stats-card">
                <Card.Body>
                  <Card.Title as="h3" className="h5 mb-3">
                    {hall}
                  </Card.Title>
                  <Table
                    bordered
                    responsive
                    size="sm"
                    className="align-middle mb-0"
                  >
                    <thead>
                      <tr>
                        <th scope="col">Item</th>
                        <th scope="col">Avg rating</th>
                        <th scope="col">% would order again</th>
                        <th scope="col"># reviews</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.map((row) => (
                        <tr key={row.item}>
                          <td>
                            <button
                              type="button"
                              className="hall-item-link"
                              onClick={() => handleItemClick(hall, row.item)}
                            >
                              {row.item}
                            </button>
                          </td>
                          <td>
                            {row.avgRating == null
                              ? "n/a"
                              : row.avgRating.toFixed(1)}
                          </td>
                          <td>
                            {row.percentAgain == null
                              ? "n/a"
                              : `${Math.round(row.percentAgain)}%`}
                          </td>
                          <td>{row.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
