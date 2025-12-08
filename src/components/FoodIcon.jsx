import React from "react";
import "../food-icons.css";

// Map items to coarse categories, so they always show the right icon.
const CATEGORY_BY_ITEM = {
  // Burgers / sandwiches / tenders
  Cheeseburger: "burger",
  "Veggie Burger": "burger",
  "Chicken Sandwich": "burger",
  "Chicken Tenders": "burger",
  "Turkey Sub": "sandwich",
  "Ham & Cheese Sandwich": "sandwich",
  "Grilled Cheese": "sandwich",

  // Pizza
  "Cheese Pizza": "pizza",
  "Pepperoni Pizza": "pizza",

  // Salads / light / fruit / parfait / acai
  "Caesar Salad": "salad",
  "Garden Salad": "salad",
  "Fruit Cup": "salad",
  "Yogurt Parfait": "salad",
  "Acai Bowl": "salad",

  // Breakfast plates
  Omelet: "breakfast",
  "Scrambled Eggs": "breakfast",
  Pancakes: "breakfast",
  Waffles: "breakfast",
  "Bagel with Cream Cheese": "breakfast",

  // Pasta / mac
  "Mac and Cheese": "pasta",
  "Pasta with Marinara": "pasta",
  "Pasta with Alfredo": "pasta",

  // Soups / bowls / asian entrées
  "Soup of the Day": "bowl",
  Chili: "bowl",
  "Fried Rice": "bowl",
  "Stir Fry Noodles": "bowl",
  "Tofu Stir Fry": "bowl",
  "Sushi Roll": "bowl",

  // Desserts
  Brownies: "dessert",
  "Chocolate Chip Cookies": "dessert",
  "Ice Cream Sundae": "dessert",

  // Drinks
  "Protein Smoothie": "drink",
  "Peanut Butter Smoothie": "drink",
};

const EMOJI_BY_CATEGORY = {
  burger: "🍔",
  sandwich: "🥪",
  pizza: "🍕",
  salad: "🥗",
  breakfast: "🍳",
  pasta: "🍝",
  bowl: "🍲",
  dessert: "🍰",
  drink: "🥤",
  default: "🍽️",
};

export default function FoodIcon({ itemName }) {
  const category =
    CATEGORY_BY_ITEM[itemName] !== undefined
      ? CATEGORY_BY_ITEM[itemName]
      : "default";

  const emoji = EMOJI_BY_CATEGORY[category] || EMOJI_BY_CATEGORY.default;

  return (
    <div
      className={`food-icon food-icon-${category}`}
      aria-label={itemName}
      role="img"
    >
      <span className="food-icon-emoji" aria-hidden="true">
        {emoji}
      </span>
      <span className="food-icon-label">{itemName}</span>
    </div>
  );
}
