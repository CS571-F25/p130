// src/data/menu.js

// All dining halls used across the app
export const DINING_HALLS = [
  "Carson's Market",
  "Four Lakes Market",
  "Gordon's Market",
  "Liz's Market",
  "Lowell Market",
  "Rheta's Market",
  "Shake Smart",
];

// Master list of menu items
export const MENU_ITEMS = [
  "Cheeseburger",
  "Veggie Burger",
  "Chicken Sandwich",
  "Chicken Tenders",
  "Mac and Cheese",
  "Pasta with Marinara",
  "Pasta with Alfredo",
  "Caesar Salad",
  "Garden Salad",
  "Fruit Cup",
  "Soup of the Day",
  "Chili",
  "Cheese Pizza",
  "Pepperoni Pizza",
  "Omelet",
  "Scrambled Eggs",
  "Pancakes",
  "Waffles",
  "Yogurt Parfait",
  "Brownies",
  "Chocolate Chip Cookies",
  "Turkey Sub",
  "Ham & Cheese Sandwich",
  "Bagel with Cream Cheese",
  "Fried Rice",
  "Stir Fry Noodles",
  "Tofu Stir Fry",
  "Sushi Roll",
  "Ice Cream Sundae",
  "Grilled Cheese",
  "Protein Smoothie",
  "Peanut Butter Smoothie",
  "Acai Bowl",
];

// Items actually shown on the Home page per hall (and other places)
export const HALL_ITEMS = {
  "Carson's Market": [
    "Turkey Sub",
    "Ham & Cheese Sandwich",
    "Garden Salad",
    "Soup of the Day",
    "Fruit Cup",
    "Chocolate Chip Cookies",
  ],
  "Four Lakes Market": [
    "Cheeseburger",
    "Veggie Burger",
    "Chicken Tenders",
    "Caesar Salad",
    "Pasta with Marinara",
    "Cheese Pizza",
  ],
  "Gordon's Market": [
    "Chicken Sandwich",
    "Chicken Tenders",
    "Cheese Pizza",
    "Pepperoni Pizza",
    "Grilled Cheese",
    "Mac and Cheese",
  ],
  "Liz's Market": [
    "Fried Rice",
    "Stir Fry Noodles",
    "Tofu Stir Fry",
    "Sushi Roll",
    "Fruit Cup",
    "Ice Cream Sundae",
  ],
  "Lowell Market": [
    "Grilled Cheese",
    "Chicken Sandwich",
    "Caesar Salad",
    "Mac and Cheese",
    "Brownies",
    "Soup of the Day",
  ],
  "Rheta's Market": [
    "Omelet",
    "Scrambled Eggs",
    "Pancakes",
    "Waffles",
    "Yogurt Parfait",
    "Garden Salad",
    "Brownies",
  ],
  "Shake Smart": [
    "Protein Smoothie",
    "Peanut Butter Smoothie",
    "Acai Bowl",
    "Yogurt Parfait",
    "Fruit Cup",
  ],
};

// Alias used by some components
export const ITEM_NAMES = MENU_ITEMS;

// Helper used by ReviewForm and other components to get items for a hall
export function getItemsForHall(hall) {
  if (!hall) {
    return ITEM_NAMES;
  }
  const hallItems = HALL_ITEMS[hall];
  if (hallItems && hallItems.length > 0) {
    return hallItems;
  }
  // Fallback to full list if hall isn't in HALL_ITEMS
  return ITEM_NAMES;
}

/**
 * Map each menu item to a file in public/items.
 * Filenames are EXACTLY the ones you listed:
 *   acai_bowl.jpeg, bagel_cream_cheese.jpeg, brownies.jpeg, ...
 */
const ITEM_FILE_MAP = {
  "Acai Bowl": "/items/acai_bowl.jpeg",
  "Bagel with Cream Cheese": "/items/bagel_cream_cheese.jpeg",
  Brownies: "/items/brownies.jpeg",
  "Caesar Salad": "/items/caesar_salad.jpeg",
  "Cheese Pizza": "/items/cheese_pizza.jpeg",
  Cheeseburger: "/items/cheeseburger.jpeg",
  "Chicken Sandwich": "/items/chicken_sandwich.jpeg",
  "Chicken Tenders": "/items/chicken_tenders.jpeg",
  Chili: "/items/chili.jpeg",
  "Chocolate Chip Cookies": "/items/chocolate_chip_cookies.jpeg",
  "Fried Rice": "/items/fried_rice.jpeg",
  "Fruit Cup": "/items/fruit_cup.jpeg",
  "Garden Salad": "/items/garden_salad.jpeg",
  "Grilled Cheese": "/items/grilled_cheese.jpeg",
  "Ham & Cheese Sandwich": "/items/ham_cheese.jpeg",
  "Ice Cream Sundae": "/items/ice_cream_sundae.jpeg",
  "Mac and Cheese": "/items/mac_and_cheese.jpeg",
  Omelet: "/items/omelet.jpeg",
  Pancakes: "/items/pancakes.jpeg",
  "Pasta with Alfredo": "/items/pasta_alfredo.jpeg",
  "Pasta with Marinara": "/items/pasta_marinara.jpeg",
  "Peanut Butter Smoothie": "/items/pb_smoothie.jpeg",
  "Pepperoni Pizza": "/items/pepperoni_pizza.jpeg",
  "Protein Smoothie": "/items/protein_smoothie.jpeg",
  "Scrambled Eggs": "/items/scrambled_eggs.jpeg",
  "Soup of the Day": "/items/soup_day.jpeg",
  "Stir Fry Noodles": "/items/stir_fry_noodles.jpeg",
  "Sushi Roll": "/items/sushi_roll.jpeg",
  "Tofu Stir Fry": "/items/tofu_stir_fry.jpeg",
  "Turkey Sub": "/items/turkey_sub.jpeg",
  "Veggie Burger": "/items/veggie_burger.jpeg",
  Waffles: "/items/waffles.jpeg",
  "Yogurt Parfait": "/items/yogurt_partfait.jpeg",
};

// Use a safe default in case we ever reference an item with no image yet
const DEFAULT_IMAGE = "/items/cheese_pizza.jpeg";

export function getImageForItem(item) {
  return ITEM_FILE_MAP[item] || DEFAULT_IMAGE;
}
