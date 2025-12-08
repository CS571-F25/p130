// src/pages/Menus.jsx
import React, { useMemo } from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DINING_HALLS, HALL_ITEMS } from "../data/menu.js";
import { INITIAL_REVIEWS } from "../data/seedReviews.js";

const HALL_MENU_LINKS = {
  "Carson's Market": {
    label: "Open in Nutrislice",
    url: "https://wisc-housingdining.nutrislice.com/menu/carsons-market",
  },
  "Four Lakes Market": {
    label: "Open in Nutrislice",
    url: "https://wisc-housingdining.nutrislice.com/menu/four-lakes-market",
  },
  "Gordon's Market": {
    label: "Open in Nutrislice",
    url: "https://wisc-housingdining.nutrislice.com/menu/gordons-market",
  },
  "Liz's Market": {
    label: "Open in Nutrislice",
    url: "https://wisc-housingdining.nutrislice.com/menu/lizs-market",
  },
  "Lowell Market": {
    label: "Open in Nutrislice",
    url: "https://wisc-housingdining.nutrislice.com/menu/lowell-market",
  },
  "Rheta's Market": {
    label: "Open in Nutrislice",
    url: "https://wisc-housingdining.nutrislice.com/menu/rhetas-market",
  },
  "Shake Smart": {
    label: "Open in Shake Smart site",
    url: "https://shakesmart.com/menu/",
  },
};

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
    const againCount = matching.filter((r) => r.wouldOrderAgain).length;
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
      <h1 className="mb-3">Menus &amp; Ratings</h1>
      <p className="text-muted mb-4">
        Browse the core menu items for each dining hall, see their average
        ratings, and how many students say they would order them again. Click an
        item to jump directly to its reviews.
      </p>

      <h2 className="h4 mb-3">Menus and Ratings by Dining Hall</h2>

      <Row className="g-4">
        {DINING_HALLS.map((hall) => {
          const stats = hallStats[hall] || [];
          const linkInfo = HALL_MENU_LINKS[hall];

          return (
            <Col md={6} key={hall}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title as="h3" className="h5 mb-3">
                    {hall}
                  </Card.Title>
                  <Table
                    bordered
                    responsive
                    size="sm"
                    className="align-middle mb-3"
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
                              className="btn btn-link p-0 align-baseline"
                              onClick={() =>
                                handleItemClick(hall, row.item)
                              }
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

                  {linkInfo && (
                    <div className="d-flex justify-content-end">
                      <Button
                        as="a"
                        href={linkInfo.url}
                        target="_blank"
                        rel="noreferrer"
                        size="sm"
                        variant="outline-primary"
                      >
                        {linkInfo.label}
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
