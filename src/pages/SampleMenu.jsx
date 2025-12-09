// src/pages/SampleMenu.jsx
import React, { useMemo, useState } from "react";
import { Container, Row, Col, Card, Form, Button, ListGroup } from "react-bootstrap";
import { DINING_HALLS, HALL_ITEMS } from "../data/menu.js";

const MEALS = ["Breakfast", "Lunch", "Dinner"];

const HALL_SLUGS = {
  "Carson's Market": "carsons-market",
  "Four Lakes Market": "four-lakes-market",
  "Gordon's Market": "gordons-market",
  "Liz's Market": "lizs-market",
  "Lowell Market": "lowell-market",
  "Rheta's Market": "rhetas-market",
  // Shake Smart handled separately
};

const MEAL_SLUGS = {
  Breakfast: "breakfast",
  Lunch: "lunch",
  Dinner: "dinner",
};

// Get today's date in America/Chicago as YYYY-MM-DD
function getTodaySlugCentral() {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(new Date());
  const year = parts.find((p) => p.type === "year")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  const day = parts.find((p) => p.type === "day")?.value;
  return `${year}-${month}-${day}`;
}

function getExternalMenuLink(hall, meal, dateSlug) {
  if (hall === "Shake Smart") {
    return "https://shakesmart.com/menu/";
  }

  const hallSlug = HALL_SLUGS[hall];
  const mealSlug = MEAL_SLUGS[meal];

  if (!hallSlug) {
    return "https://wisc-housingdining.nutrislice.com/";
  }

  if (mealSlug && dateSlug) {
    // /menu/four-lakes-market/lunch/2025-12-08
    return `https://wisc-housingdining.nutrislice.com/menu/${hallSlug}/${mealSlug}/${dateSlug}`;
  }

  return `https://wisc-housingdining.nutrislice.com/menu/${hallSlug}`;
}

function getExternalButtonLabel(hall) {
  if (hall === "Shake Smart") {
    return "Open in Shake Smart";
  }
  return "View on Nutrislice";
}

function buildSampleMenu(hall, meal) {
  const hallItems = HALL_ITEMS[hall] || [];
  if (hallItems.length === 0) return [];

  let offset = 0;
  if (meal === "Lunch") offset = 2;
  else if (meal === "Dinner") offset = 4;

  const slice = hallItems.slice(offset, offset + 5);
  return slice.length > 0 ? slice : hallItems.slice(0, 5);
}

export default function SampleMenu() {
  const [hall, setHall] = useState("Four Lakes Market");
  const [meal, setMeal] = useState("Lunch");

  const todayText = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(undefined, {
      timeZone: "America/Chicago",
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    return formatter.format(new Date());
  }, []);

  const todaySlug = useMemo(() => getTodaySlugCentral(), []);

  const sampleItems = useMemo(
    () => buildSampleMenu(hall, meal),
    [hall, meal],
  );

  const externalUrl = getExternalMenuLink(hall, meal, todaySlug);
  const externalLabel = getExternalButtonLabel(hall);

  return (
    <Container className="py-4">
      <h1 className="mb-3">Menu Today</h1>
      <p className="text-muted mb-4">
        This page shows a Nutrislice-inspired <strong>example</strong> menu
        using dining hall items from this app. Select a dining hall and a meal
        to see what a typical lineup might look like, then jump to the official
        Nutrislice or Shake Smart page for the real menu.
      </p>

      <h2 className="h4 mb-3">Today&apos;s Sample Menu</h2>
      <p className="text-muted mb-4">
        This page focuses only on what&apos;s being served—no ratings. Use the
        red button to open the official menu for the selected hall and meal.
      </p>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row className="align-items-center g-3">
            <Col md={4}>
              <Form.Group controlId="sampleHall">
                <Form.Label>Dining hall</Form.Label>
                <Form.Select
                  value={hall}
                  onChange={(e) => setHall(e.target.value)}
                  aria-label="Select dining hall for sample menu"
                >
                  {DINING_HALLS.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="sampleMeal">
                <Form.Label>Meal</Form.Label>
                <Form.Select
                  value={meal}
                  onChange={(e) => setMeal(e.target.value)}
                  aria-label="Select meal for sample menu"
                >
                  {MEALS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col
              md={4}
              className="d-flex justify-content-md-end justify-content-start"
            >
              <Button
                as="a"
                href={externalUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 mt-md-0"
                variant="danger"
              >
                {externalLabel}
              </Button>
            </Col>
          </Row>

          <div className="mt-3 small text-muted">
            <p className="mb-1">
              {todayText} · Sample menu for <strong>{hall}</strong> (
              {meal.toLowerCase()}) in Central Time.
            </p>
            <p className="mb-0">
              <strong>Disclaimer:</strong> This menu is an{" "}
              <em>example</em> based on items in this app. It is{" "}
              <strong>not</strong> the official menu for this date. For
              real-time menus and nutrition details, please use{" "}
              <a
                href="https://wisc-housingdining.nutrislice.com/"
                target="_blank"
                rel="noreferrer"
              >
                Nutrislice
              </a>{" "}
              {hall === "Shake Smart" && (
                <>
                  {" "}
                  or{" "}
                  <a
                    href="https://shakesmart.com/menu/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Shake Smart
                  </a>
                  .
                </>
              )}
            </p>
          </div>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <h3 className="h5 mb-3">
            Example {meal.toLowerCase()} menu for {hall}
          </h3>
          {sampleItems.length === 0 ? (
            <p className="text-muted mb-0">
              No sample items are configured for this hall yet.
            </p>
          ) : (
            <ListGroup as="ul">
              {sampleItems.map((item) => (
                <ListGroup.Item key={item} as="li">
                  {item}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
