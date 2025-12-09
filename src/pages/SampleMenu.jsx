// src/pages/SampleMenu.jsx
import React, { useMemo, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ListGroup,
} from "react-bootstrap";
import { DINING_HALLS, HALL_ITEMS } from "../data/menu.js";

const BASE_MEALS = ["Breakfast", "Lunch", "Dinner"];

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

// Meals allowed per hall
function getMealsForHall(hall) {
  if (hall === "Shake Smart") {
    return []; // no meal concept
  }
  if (hall === "Carson's Market") {
    return ["Lunch", "Dinner"];
  }
  return BASE_MEALS;
}

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
  const mealSlug = meal ? MEAL_SLUGS[meal] : null;

  if (!hallSlug) {
    return "https://wisc-housingdining.nutrislice.com/";
  }

  if (mealSlug && dateSlug) {
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

  // Keep meal valid when hall changes
  useEffect(() => {
    const allowedMeals = getMealsForHall(hall);
    if (allowedMeals.length === 0) {
      setMeal("All day");
    } else if (!allowedMeals.includes(meal)) {
      setMeal(allowedMeals[0]);
    }
  }, [hall, meal]);

  const allowedMeals = getMealsForHall(hall);

  const sampleItems = useMemo(
    () => buildSampleMenu(hall, allowedMeals.length === 0 ? null : meal),
    [hall, meal, allowedMeals.length],
  );

  const externalUrl = getExternalMenuLink(
    hall,
    allowedMeals.length === 0 ? null : meal,
    todaySlug,
  );
  const externalLabel = getExternalButtonLabel(hall);

  const displayMealText =
    allowedMeals.length === 0 ? "all-day menu" : meal.toLowerCase();

  return (
    <Container className="py-4">
      <h1 className="mb-3">Menu Today</h1>
      <p className="text-muted mb-4">
        This page shows a Nutrislice-inspired <strong>example</strong> menu
        using dining hall items from this app. Select a dining hall (and meal,
        where it makes sense) to see a sample lineup, then open the official
        site for the real menu.
      </p>

      <h2 className="h4 mb-3">Today&apos;s Sample Menu</h2>

      {/* Controls + official link */}
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
              {allowedMeals.length > 0 ? (
                <Form.Group controlId="sampleMeal">
                  <Form.Label>Meal</Form.Label>
                  <Form.Select
                    value={meal}
                    onChange={(e) => setMeal(e.target.value)}
                    aria-label="Select meal for sample menu"
                  >
                    {allowedMeals.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              ) : (
                <Form.Group>
                  <Form.Label>Meal</Form.Label>
                  <div className="form-control-plaintext">
                    All-day menu (no meal time)
                  </div>
                </Form.Group>
              )}
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
        </Card.Body>
      </Card>

      {/* Example menu + disclaimer directly underneath heading */}
      <Card className="shadow-sm">
        <Card.Body>
          <h3 className="h5 mb-2">
            Example {displayMealText} for {hall}
          </h3>

          <p className="small text-muted mb-3">
            <strong>{todayText}</strong> in Central Time. This menu is an{" "}
            <em>example</em> based on items from this app; it is{" "}
            <strong>not</strong> the official menu for this date. For real-time
            menus and nutrition details, please use{" "}
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
