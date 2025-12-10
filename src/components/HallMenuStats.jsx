// src/components/HallMenuStats.jsx
import { Card, Table, Row, Col, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DINING_HALLS, HALL_ITEMS } from "../data/menu.js";

function computeStats(reviews, hall, item) {
  const relevant = reviews.filter((r) => r.hall === hall && r.item === item);
  const count = relevant.length;
  if (!count) {
    return { avgRating: null, percentAgain: null, count: 0 };
  }

  const sum = relevant.reduce(
    (acc, r) => acc + (Number(r.rating) || 0),
    0,
  );
  const avgRating = sum / count;

  // Support both wouldOrderAgain (new) and wouldAgain (old)
  const againCount = relevant.filter((r) => {
    if (typeof r.wouldOrderAgain === "boolean") {
      return r.wouldOrderAgain;
    }
    if (typeof r.wouldAgain === "boolean") {
      return r.wouldAgain;
    }
    return false;
  }).length;

  const percentAgain = Math.round((againCount / count) * 100);
  return { avgRating, percentAgain, count };
}

export default function HallMenuStats({ reviews }) {
  const navigate = useNavigate();

  const goToReviews = (hall, item) => {
    navigate("/reviews", { state: { hall, item } });
  };

  return (
    <div className="mt-4">
      <h2 className="h3 mb-3">Menus and Ratings by Dining Hall</h2>
      <p className="text-muted">
        This page acts as a simple menu snapshot for each dining hall. Click an
        item name to jump to reviews filtered for that hall and item.
      </p>

      <Row className="g-3">
        {DINING_HALLS.map((hall) => {
          const items = HALL_ITEMS[hall] || [];

          return (
            <Col key={hall} md={6}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title as="h3" className="h5">
                    {hall}
                  </Card.Title>
                  {items.length === 0 ? (
                    <p className="text-muted mb-0">
                      No items configured for this hall yet.
                    </p>
                  ) : (
                    <Table
                      size="sm"
                      bordered
                      hover
                      responsive
                      className="mb-0"
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
                        {items.map((item) => {
                          const { avgRating, percentAgain, count } =
                            computeStats(reviews, hall, item);
                          return (
                            <tr key={item}>
                              <td>
                                <Button
                                  variant="link"
                                  className="p-0"
                                  onClick={() => goToReviews(hall, item)}
                                >
                                  {item}
                                </Button>
                              </td>
                              <td>
                                {count === 0 ? (
                                  <span className="text-muted small">n/a</span>
                                ) : (
                                  avgRating.toFixed(1)
                                )}
                              </td>
                              <td>
                                {count === 0 ? (
                                  <span className="text-muted small">n/a</span>
                                ) : (
                                  `${percentAgain}%`
                                )}
                              </td>
                              <td>
                                {count === 0 ? (
                                  <Badge bg="light" text="dark">
                                    0
                                  </Badge>
                                ) : (
                                  <Badge bg="primary">{count}</Badge>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
