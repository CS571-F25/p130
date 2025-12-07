// src/components/HallMenuStats.jsx
import { Card, Table, Row, Col, Badge } from "react-bootstrap";
import {
  DINING_HALLS,
  HALL_ITEMS,
  HALL_MENU_LINKS
} from "../data/menu.js";

function computeStats(reviews, hall, item) {
  const relevant = reviews.filter(
    (r) => r.hall === hall && r.item === item
  );
  const count = relevant.length;
  if (!count) {
    return { avgRating: null, percentAgain: null, count: 0 };
  }
  const sum = relevant.reduce((acc, r) => acc + (Number(r.rating) || 0), 0);
  const avgRating = sum / count;
  const againCount = relevant.filter((r) => r.wouldAgain).length;
  const percentAgain = Math.round((againCount / count) * 100);
  return { avgRating, percentAgain, count };
}

export default function HallMenuStats({ reviews }) {
  return (
    <div className="mt-4">
      <h3 className="mb-3">Menus & Ratings Overview</h3>
      <p className="text-muted">
        For each dining hall, you can open today&apos;s menu on Nutrislice and
        see how students have rated the core items on this site.
      </p>

      <Row className="g-3">
        {DINING_HALLS.map((hall) => {
          const items = HALL_ITEMS[hall] || [];
          const url =
            HALL_MENU_LINKS[hall] ||
            "https://wisc-housingdining.nutrislice.com/menu/";

          return (
            <Col key={hall} md={6}>
              <Card className="h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Card.Title className="mb-0">{hall}</Card.Title>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="small"
                    >
                      View today&apos;s menu
                    </a>
                  </div>
                  {items.length === 0 ? (
                    <p className="text-muted mb-0">
                      No items configured for this hall yet.
                    </p>
                  ) : (
                    <Table size="sm" bordered hover responsive className="mb-0">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Avg rating</th>
                          <th>% would order again</th>
                          <th># reviews</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => {
                          const { avgRating, percentAgain, count } =
                            computeStats(reviews, hall, item);
                          return (
                            <tr key={item}>
                              <td>{item}</td>
                              <td>
                                {count === 0
                                  ? <span className="text-muted small">n/a</span>
                                  : avgRating.toFixed(1)}
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
