// src/pages/SampleMenu.jsx
import { useEffect, useMemo, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import CurrentMenuSection from "../components/CurrentMenuSection.jsx";
import { getImageForItem } from "../data/menu.js";
import { INITIAL_REVIEWS } from "../data/seedReviews.js";

const STORAGE_KEY = "uwDiningReviews";

// Nutrislice links for each hall
const HALL_LINKS = [
  {
    label: "Carson's Market",
    value: "Carson's Market",
    nutrisliceUrl:
      "https://wisc-housingdining.nutrislice.com/menu/carsons-market",
  },
  {
    label: "Four Lakes Market",
    value: "Four Lakes Market",
    nutrisliceUrl:
      "https://wisc-housingdining.nutrislice.com/menu/four-lakes-market",
  },
  {
    label: "Gordon's Market",
    value: "Gordon's Market",
    nutrisliceUrl:
      "https://wisc-housingdining.nutrislice.com/menu/gordon-avenue-market",
  },
  {
    label: "Liz's Market",
    value: "Liz's Market",
    nutrisliceUrl:
      "https://wisc-housingdining.nutrislice.com/menu/cronyn-lizs-market",
  },
  {
    label: "Lowell Market",
    value: "Lowell Market",
    nutrisliceUrl:
      "https://wisc-housingdining.nutrislice.com/menu/lowell-market",
  },
  {
    label: "Rheta's Market",
    value: "Rheta's Market",
    nutrisliceUrl:
      "https://wisc-housingdining.nutrislice.com/menu/rhetas-market",
  },
  {
    label: "Shake Smart",
    value: "Shake Smart",
    nutrisliceUrl:
      "https://wisc-housingdining.nutrislice.com/menu/shake-smart",
  },
];

export default function SampleMenu() {
  const [reviews, setReviews] = useState([]);

  // Load INITIAL_REVIEWS + user reviews from localStorage
  useEffect(() => {
    let userReviews = [];

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          userReviews = parsed;
        }
      }
    } catch {
      // ignore and keep seeds
    }

    setReviews([...INITIAL_REVIEWS, ...userReviews]);
  }, []);

  const normalizedReviews = useMemo(
    () =>
      reviews.map((r) => ({
        ...r,
        imageUrl: getImageForItem(r.item),
      })),
    [reviews]
  );

  return (
    <Container className="page">
      <h1 className="h2">Sample Daily Menu</h1>
      <p className="text-muted">
        This page shows a Nutrislice-inspired{" "}
        <strong>example</strong> menu using items and ratings from this
        site. Select a dining hall and meal to see what a typical lineup
        might look like, and how UW students rate each item.
      </p>

      {/* Nutrislice-like sample menu driven by app data */}
      <CurrentMenuSection reviews={normalizedReviews} />

      {/* Clear section for official Nutrislice links */}
      <section
        aria-labelledby="official-menus-heading"
        className="mt-4 mb-3"
      >
        <h2 id="official-menus-heading" className="h3 mb-3">
          Official Menus on Nutrislice
        </h2>
        <Card className="mb-3">
          <Card.Body>
            <p className="mb-2">
              For <strong>live, official menus</strong>, nutrition
              information, and allergen details, always refer to the UW
              Housing Nutrislice site.
            </p>
            <p className="mb-0 small text-muted">
              <strong>Important:</strong> The sample menu above is{" "}
              <em>not</em> guaranteed to match the actual food served on a
              given day. Use the buttons below to open the real Nutrislice
              pages in a new tab.
            </p>
          </Card.Body>
        </Card>

        <Row className="g-3">
          {HALL_LINKS.map((hall) => (
            <Col xs={12} md={6} lg={4} key={hall.value}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title>{hall.label}</Card.Title>
                    <Card.Text className="small text-muted">
                      See today&apos;s breakfast, lunch, and dinner menus,
                      plus nutrition info, straight from UW Housing.
                    </Card.Text>
                  </div>
                  <div className="mt-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      href={hall.nutrisliceUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open in Nutrislice
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
}
