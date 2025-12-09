// src/pages/MenuToday.jsx
import React, { useMemo, useState } from "react";
import { Container, Card, Form, Row, Col, Button } from "react-bootstrap";
import { DINING_HALLS } from "../data/menu.js";

const NUTRISLICE_PATHS = {
  "Four Lakes Market": "four-lakes-market",
  "Gordon's Market": "gordons-market",
  "Carson's Market": "carsons-market",
  "Liz's Market": "lizs-market",
  "Lowell Market": "lowell-market",
  "Rheta's Market": "rhetas-market",
};

const MEAL_OPTIONS = ["Breakfast", "Lunch", "Dinner"];

function todayDateString() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function MenuToday() {
  const [hall, setHall] = useState("Four Lakes Market");
  const [meal, setMeal] = useState("Lunch");

  const dateStr = todayDateString();

  const mealOptionsForHall = useMemo(() => {
    if (hall === "Shake Smart") {
      // Shake Smart doesn't have normal meal times here
      return [];
    }
    if (hall === "Carson's Market") {
      return ["Lunch", "Dinner"];
    }
    return MEAL_OPTIONS;
  }, [hall]);

  const isShakeSmart = hall === "Shake Smart";

  const nutrisliceUrl = useMemo(() => {
    if (isShakeSmart) {
      // Use Shake Smart's own menu site
      return "https://www.shakesmart.com/menu";
    }
    const slug = NUTRISLICE_PATHS[hall];
    if (!slug || !meal) return "";
    const mealSlug = meal.toLowerCase();
    return `https://wisc-housingdining.nutrislice.com/menu/${slug}/${mealSlug}/${dateStr}`;
  }, [hall, meal, dateStr, isShakeSmart]);

  // Simple example menu items (just for illustration)
  const sampleItems = useMemo(() => {
    if (isShakeSmart) {
      return [
        "Peanut Butter Protein Smoothie",
        "Acai Bowl",
        "Strawberry Banana Smoothie",
        "Overnight Oats Cup",
      ];
    }
    if (meal === "Breakfast") {
      return ["Scrambled Eggs", "Pancakes", "Waffles", "Yogurt Parfait"];
    }
    if (meal === "Lunch") {
      return ["Cheeseburger", "Chicken Tenders", "Garden Salad", "Fruit Cup"];
    }
    // Dinner
    return ["Pepperoni Pizza", "Pasta Alfredo", "Tofu Stir Fry", "Caesar Salad"];
  }, [meal, isShakeSmart]);

  return (
    <Container className="py-4">
      <h1 className="mb-3">Menu Today</h1>
      <p className="text-muted mb-4">
        Preview a sample of what a dining hall&apos;s menu might look like today,
        and follow the link to Nutrislice or the Shake Smart website for the
        official, up-to-date menu.
      </p>

      <Card className="shadow-sm mb-3">
        <Card.Body>
          <Row className="g-3 align-items-end">
            <Col md={6}>
              <Form.Group controlId="menuTodayHall">
                <Form.Label>Dining hall</Form.Label>
                <Form.Select
                  value={hall}
                  onChange={(e) => {
                    setHall(e.target.value);
                    if (e.target.value === "Carson's Market" && meal === "Breakfast") {
                      setMeal("Lunch");
                    }
                  }}
                >
                  {DINING_HALLS.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              {!isShakeSmart && (
                <Form.Group controlId="menuTodayMeal">
                  <Form.Label>Meal</Form.Label>
                  <Form.Select
                    value={meal}
                    onChange={(e) => setMeal(e.target.value)}
                  >
                    {mealOptionsForHall.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="h4 mb-2">
            Example menu for {hall}
            {!isShakeSmart && mealOptionsForHall.length > 0 && ` – ${meal}`}
          </h2>
          <p className="text-muted small mb-2">
            This is an illustrative example and may not match the official menu
            for {dateStr}. For real menus and nutrition info, use the link
            below.
          </p>

          <Button
            type="button"
            as="a"
            href={nutrisliceUrl || "#"}
            target="_blank"
            rel="noreferrer"
            className="mb-3"
            disabled={!nutrisliceUrl}
          >
            {isShakeSmart ? "Open in Shake Smart" : "View on Nutrislice"}
          </Button>

          <div className="mt-3">
            <h3 className="h5">Sample items</h3>
            <ul className="mb-0">
              {sampleItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
