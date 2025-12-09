// src/components/ReviewCard.jsx
import React, { useMemo, useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";

// Map from normalized item slug → actual filename in public/items
// Filenames available (from user):
// acai_bowl.jpegbagel_cream_cheese.jpegbrownies.jpegcaesar_salad.jpegcheese_pizza.jpeg
// cheeseburger.jpegchicken_sandwich.jpegchicken_tenders.jpegchili.jpegchocolate_chip_cookies.jpeg
// fried_rice.jpegfruit_cup.jpeggarden_salad.jpeggrilled_cheese.jpegham_cheese.jpegice_cream_sundae.jpeg
// mac_and_cheese.jpegomelet.jpegscrambled_eggs.jpegsoup_day.jpegstir_fry_noodles.jpegsushi_roll.jpeg
// tofu_stir_fry.jpegturkey_sub.jpegveggie_burger.jpegwaffles.jpegyogurt_partfait.jpeg
const IMAGE_OVERRIDE_MAP = {
  acai_bowl: "acai_bowl.jpeg",

  bagel_and_cream_cheese: "bagel_cream_cheese.jpeg",
  bagel_with_cream_cheese: "bagel_cream_cheese.jpeg",
  bagel_cream_cheese: "bagel_cream_cheese.jpeg",

  brownies: "brownies.jpeg",

  caesar_salad: "caesar_salad.jpeg",

  cheese_pizza: "cheese_pizza.jpeg",

  cheeseburger: "cheeseburger.jpeg",

  chicken_sandwich: "chicken_sandwich.jpeg",

  chicken_tenders: "chicken_tenders.jpeg",

  chili: "chili.jpeg",

  chocolate_chip_cookies: "chocolate_chip_cookies.jpeg",

  fried_rice: "fried_rice.jpeg",

  fruit_cup: "fruit_cup.jpeg",

  garden_salad: "garden_salad.jpeg",

  grilled_cheese: "grilled_cheese.jpeg",

  ham_cheese: "ham_cheese.jpeg",
  ham_and_cheese: "ham_cheese.jpeg",
  ham_and_cheese_sandwich: "ham_cheese.jpeg",
  ham_cheese_sandwich: "ham_cheese.jpeg",

  ice_cream_sundae: "ice_cream_sundae.jpeg",

  mac_and_cheese: "mac_and_cheese.jpeg",
  mac_n_cheese: "mac_and_cheese.jpeg",
  mac_and_cheese_bake: "mac_and_cheese.jpeg",

  omelet: "omelet.jpeg",
  omelette: "omelet.jpeg",

  pancakes: "pancakes.jpeg",

  // Pasta aliases
  pasta_alfredo: "pasta_alfredo.jpeg",
  pasta_with_alfredo: "pasta_alfredo.jpeg",
  alfredo_pasta: "pasta_alfredo.jpeg",
  fettuccine_alfredo: "pasta_alfredo.jpeg",

  pasta_marinara: "pasta_marinara.jpeg",
  pasta_with_marinara: "pasta_marinara.jpeg",
  marinara_pasta: "pasta_marinara.jpeg",
  spaghetti_marinara: "pasta_marinara.jpeg",

  pb_smoothie: "pb_smoothie.jpeg",
  peanut_butter_smoothie: "pb_smoothie.jpeg",

  pepperoni_pizza: "pepperoni_pizza.jpeg",

  protein_smoothie: "protein_smoothie.jpeg",

  scrambled_eggs: "scrambled_eggs.jpeg",

  soup_of_the_day: "soup_day.jpeg",
  soup_day: "soup_day.jpeg",

  stir_fry_noodles: "stir_fry_noodles.jpeg",

  sushi_roll: "sushi_roll.jpeg",

  tofu_stir_fry: "tofu_stir_fry.jpeg",

  turkey_sub: "turkey_sub.jpeg",

  veggie_burger: "veggie_burger.jpeg",

  waffles: "waffles.jpeg",

  yogurt_parfait: "yogurt_partfait.jpeg",
  yogurt_partfait: "yogurt_partfait.jpeg",
};

function slugItemName(name) {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function toImagePathFromItemName(itemName) {
  const slug = slugItemName(itemName);
  if (!slug) {
    return "items/placeholder.jpeg";
  }

  const override = IMAGE_OVERRIDE_MAP[slug];
  if (override) {
    return `items/${override}`;
  }

  // Default: try <slug>.jpeg
  return `items/${slug}.jpeg`;
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function StarRow({ rating }) {
  const full = Number(rating) || 0;
  const stars = [];
  for (let i = 1; i <= 5; i += 1) {
    const filled = i <= full;
    stars.push(
      <span
        key={i}
        aria-hidden="true"
        style={{
          color: filled ? "#c5050c" : "#ffffff",
          WebkitTextStrokeWidth: "1px",
          WebkitTextStrokeColor: "black",
          marginRight: 2,
          fontSize: "20px",
        }}
      >
        ★
      </span>,
    );
  }
  return (
    <span>
      {stars}
      <span className="visually-hidden">{full} out of 5 stars</span>
    </span>
  );
}

export default function ReviewCard({ review, currentUser, onDelete }) {
  const [imgSrc, setImgSrc] = useState(
    toImagePathFromItemName(review.item || ""),
  );

  const canDelete = useMemo(
    () => Boolean(currentUser && review.user && currentUser === review.user),
    [currentUser, review.user],
  );

  const handleImgError = () => {
    setImgSrc("items/placeholder.jpeg");
  };

  // Always show Order again: Yes/No (treat missing as No)
  const wouldAgain = !!review.wouldOrderAgain;

  return (
    <Card className="shadow-sm review-card">
      <Card.Body>
        {/* Left: image */}
        <div className="item-image-circle" aria-hidden="true">
          <img
            src={imgSrc}
            alt={review.item ? `${review.item} example` : "Food item"}
            onError={handleImgError}
            className="item-image-photo"
          />
        </div>

        {/* Right: content */}
        <div style={{ flex: 1 }}>
          <div className="d-flex justify-content-between align-items-start mb-1">
            <div>
              <Card.Title as="h3" className="h5 mb-1">
                {review.item}
              </Card.Title>
              <div className="small text-muted">
                {review.hall} ·{" "}
                <span>{formatDate(review.createdAt) || "Unknown time"}</span>
              </div>
            </div>
            <div className="text-end">
              <StarRow rating={review.rating} />
              <div className="small text-muted">{review.rating} / 5</div>
            </div>
          </div>

          {review.text && (
            <Card.Text className="mt-2 mb-2">{review.text}</Card.Text>
          )}

          <div className="d-flex justify-content-between align-items-center">
            <div className="small text-muted">
              <span>Posted by </span>
              <strong>{review.user || "Anonymous"}</strong> ·{" "}
              <span>Order again: </span>
              <Badge bg={wouldAgain ? "danger" : "secondary"} as="span">
                {wouldAgain ? "Yes" : "No"}
              </Badge>
            </div>

            {canDelete && (
              <Button
                type="button"
                size="sm"
                onClick={onDelete}
                aria-label="Delete this review"
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
