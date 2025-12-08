// src/components/CurrentMenuSection.jsx
import { useMemo, useState } from "react";
import {
  Card,
  Col,
  Form,
  Row,
  Table,
  Badge,
  Button,
} from "react-bootstrap";

// Map each hall to a Nutrislice URL (just regular links, no API calls)
const HALL_OPTIONS = [
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

const MEAL_OPTIONS = ["Breakfast", "Lunch", "Dinner"];

// Example "current menu" mapping by hall + meal.
// Items are names that already exist in your menu/review data.
const CURRENT_MENU = {
  "Carson's Market": {
    Breakfast: ["Bagel with Cream Cheese", "Yogurt Parfait"],
    Lunch: [
      "Turkey Sub",
      "Ham & Cheese Sandwich",
      "Garden Salad",
      "Soup of the Day",
    ],
    Dinner: ["Turkey Sub", "Soup of the Day", "Chocolate Chip Cookies"],
  },
  "Four Lakes Market": {
    Breakfast: ["Fruit Cup", "Yogurt Parfait"],
    Lunch: ["Cheeseburger", "Veggie Burger", "Chicken Tenders", "Caesar Salad"],
    Dinner: ["Cheeseburger", "Chicken Tenders", "Pasta with Marinara"],
  },
  "Gordon's Market": {
    Breakfast: ["Fruit Cup"],
    Lunch: [
      "Chicken Sandwich",
      "Chicken Tenders",
      "Cheese Pizza",
      "Pepperoni Pizza",
      "Garden Salad",
    ],
    Dinner: ["Chicken Tenders", "Mac and Cheese", "Chili", "Chocolate Chip Cookies"],
  },
  "Liz's Market": {
    Breakfast: ["Fruit Cup", "Yogurt Parfait"],
    Lunch: ["Fried Rice", "Stir Fry Noodles", "Tofu Stir Fry", "Sushi Roll"],
    Dinner: ["Fried Rice", "Stir Fry Noodles", "Ice Cream Sundae"],
  },
  "Lowell Market": {
    Breakfast: ["Bagel with Cream Cheese", "Yogurt Parfait"],
    Lunch: ["Grilled Cheese", "Chicken Sandwich", "Caesar Salad"],
    Dinner: ["Grilled Cheese", "Mac and Cheese", "Brownies"],
  },
  "Rheta's Market": {
    Breakfast: ["Omelet", "Scrambled Eggs", "Pancakes", "Waffles"],
    Lunch: ["Yogurt Parfait", "Garden Salad"],
    Dinner: ["Brownies", "Yogurt Parfait"],
  },
  "Shake Smart": {
    Breakfast: ["Protein Smoothie", "Yogurt Parfait"],
    Lunch: ["Protein Smoothie", "Acai Bowl", "Peanut Butter Smoothie"],
    Dinner: ["Protein Smoothie", "Acai Bowl", "Yogurt Parfait"],
  },
};

// Simple categories to mimic Nutrislice sections
const ITEM_CATEGORY = {
  // Breakfast mains
  Omelet: "Breakfast Mains",
  "Scrambled Eggs": "Breakfast Mains",
  Pancakes: "Breakfast Mains",
  Waffles: "Breakfast Mains",
  "Bagel with Cream Cheese": "Breakfast Mains",

  // Entrees / mains
  Cheeseburger: "Mains & Grill",
  "Veggie Burger": "Mains & Grill",
  "Chicken Sandwich": "Mains & Grill",
  "Chicken Tenders": "Mains & Grill",
  "Mac and Cheese": "Mains & Grill",
  "Pasta with Marinara": "Mains & Grill",
  "Pasta with Alfredo": "Mains & Grill",
  "Fried Rice": "Mains & Grill",
  "Stir Fry Noodles": "Mains & Grill",
  "Tofu Stir Fry": "Mains & Grill",
  "Sushi Roll": "Mains & Grill",
  "Turkey Sub": "Mains & Grill",
  "Ham & Cheese Sandwich": "Mains & Grill",
  "Cheese Pizza": "Mains & Grill",
  "Pepperoni Pizza": "Mains & Grill",

  // Sides / salads / soups
  "Caesar Salad": "Sides, Salads & Soups",
  "Garden Salad": "Sides, Salads & Soups",
  "Fruit Cup": "Sides, Salads & Soups",
  "Soup of the Day": "Sides, Salads & Soups",
  Chili: "Sides, Salads & Soups",
  "Yogurt Parfait": "Sides, Salads & Soups",

  // Desserts
  "Chocolate Chip Cookies": "Desserts & Treats",
  Brownies: "Desserts & Treats",
  "Ice Cream Sundae": "Desserts & Treats",

  // Drinks / smoothies
  "Protein Smoothie": "Drinks & Smoothies",
  "Peanut Butter Smoothie": "Drinks & Smoothies",
  "Acai Bowl": "Drinks & Smoothies",
};

function buildStatsMap(reviews) {
  const map = new Map();

  for (const r of reviews) {
    const key = `${r.hall}||${r.item}`;
    if (!map.has(key)) {
      map.set(key, {
        hall: r.hall,
        item: r.item,
        count: 0,
        sumRating: 0,
        yesAgain: 0,
      });
    }
    const entry = map.get(key);
    entry.count += 1;
    entry.sumRating += Number(r.rating) || 0;
    if (r.wouldAgain) {
      entry.yesAgain += 1;
    }
  }

  return map;
}

function getStatsFor(statsMap, hall, item) {
  const key = `${hall}||${item}`;
  const entry = statsMap.get(key);
  if (!entry || entry.count === 0) {
    return { avgRating: "n/a", percentAgain: "n/a", count: 0 };
  }

  const avg = entry.sumRating / entry.count;
  const pct = (entry.yesAgain / entry.count) * 100;

  return {
    avgRating: avg.toFixed(1),
    percentAgain: `${Math.round(pct)}%`,
    count: entry.count,
  };
}

function getCategoryForItem(itemName) {
  return ITEM_CATEGORY[itemName] || "Other items";
}

export default function CurrentMenuSection({ reviews }) {
  const [selectedHallValue, setSelectedHallValue] = useState(
    HALL_OPTIONS[1].value // default Four Lakes
  );
  const [selectedMeal, setSelectedMeal] = useState("Lunch");

  const statsMap = useMemo(() => buildStatsMap(reviews), [reviews]);

  const todayLabel = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }, []);

  const hallConfig = HALL_OPTIONS.find(
    (h) => h.value === selectedHallValue
  );
  const itemsForSelection =
    CURRENT_MENU[selectedHallValue]?.[selectedMeal] ?? [];

  // Sort items by category then name so the sections are grouped
  const groupedItems = useMemo(() => {
    const withCategory = itemsForSelection.map((name) => ({
      name,
      category: getCategoryForItem(name),
    }));
    withCategory.sort((a, b) => {
      if (a.category === b.category) {
        return a.name.localeCompare(b.name);
      }
      return a.category.localeCompare(b.category);
    });
    return withCategory;
  }, [itemsForSelection]);

  return (
    <section className="mb-4" aria-labelledby="current-menu-heading">
      <h2 id="current-menu-heading" className="h3 mb-3">
        Today&apos;s Sample Menu
      </h2>
      <p className="text-muted">
        This section mimics the style of the official Nutrislice menus using
        data from this app. Select a dining hall and meal to see a sample
        lineup and how students rate each item.
      </p>

      <Card className="mb-3">
        <Card.Body>
          <Row className="g-3 align-items-end">
            <Col xs={12} md={6}>
              <Form.Group controlId="currentMenuHall">
                <Form.Label>Dining hall</Form.Label>
                <Form.Select
                  value={selectedHallValue}
                  onChange={(e) => setSelectedHallValue(e.target.value)}
                >
                  {HALL_OPTIONS.map((hall) => (
                    <option key={hall.value} value={hall.value}>
                      {hall.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group controlId="currentMenuMeal">
                <Form.Label>Meal</Form.Label>
                <Form.Select
                  value={selectedMeal}
                  onChange={(e) => setSelectedMeal(e.target.value)}
                >
                  {MEAL_OPTIONS.map((meal) => (
                    <option key={meal} value={meal}>
                      {meal}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={3} className="text-md-end">
              {hallConfig && (
                <Button
                  variant="outline-primary"
                  className="mt-3 mt-md-0"
                  href={hallConfig.nutrisliceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on Nutrislice
                </Button>
              )}
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <p className="small mb-0 text-muted">
                <strong>{todayLabel}</strong> • Sample menu for{" "}
                <strong>{selectedHallValue}</strong> (
                {selectedMeal.toLowerCase()})
              </p>
              <p className="small text-muted mb-0">
                <strong>Disclaimer:</strong> This menu is an{" "}
                <em>example</em> based on items and ratings from this site. It
                is <strong>not</strong> the official menu for this date. For
                real-time menus and nutrition details, please use{" "}
                {hallConfig && (
                  <a
                    href={hallConfig.nutrisliceUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Nutrislice
                  </a>
                )}
                .
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <h3 className="h4 mb-3">
            {selectedHallValue} – {selectedMeal}
          </h3>
          {groupedItems.length === 0 ? (
            <p className="text-muted mb-0">
              No items configured for this meal yet.
            </p>
          ) : (
            <Table
              striped
              bordered
              hover
              responsive
              size="sm"
              className="mb-0"
            >
              <thead>
                <tr>
                  <th scope="col">Section</th>
                  <th scope="col">Item</th>
                  <th scope="col">Avg rating</th>
                  <th scope="col">% would order again</th>
                  <th scope="col">
                    # reviews{" "}
                    <span className="visually-hidden">
                      for this item in the app
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {groupedItems.map(({ name, category }, idx) => {
                  const stats = getStatsFor(
                    statsMap,
                    selectedHallValue,
                    name
                  );
                  const showCategory =
                    idx === 0 ||
                    groupedItems[idx - 1].category !== category;

                  return (
                    <tr key={name}>
                      <td>
                        {showCategory ? (
                          <strong>{category}</strong>
                        ) : (
                          <span className="text-muted small">↳</span>
                        )}
                      </td>
                      <td>{name}</td>
                      <td>{stats.avgRating}</td>
                      <td>{stats.percentAgain}</td>
                      <td>
                        {stats.count > 0 ? (
                          <Badge bg="primary">{stats.count}</Badge>
                        ) : (
                          <span className="text-muted">0</span>
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
    </section>
  );
}
