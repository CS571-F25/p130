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

// Alias used by older code (e.g., ReviewForm.jsx)
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

// One realistic image per item (Unsplash)
const ITEM_IMAGE_MAP = {
  Cheeseburger:
    "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80",
  "Veggie Burger":
    "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80",
  "Chicken Sandwich":
    "https://images.unsplash.com/photo-1615937691194-96f162d6cdec?auto=format&fit=crop&w=400&q=80",
  "Chicken Tenders":
    "https://images.unsplash.com/photo-1604908176997-1251884b08a6?auto=format&fit=crop&w=400&q=80",
  "Mac and Cheese":
    "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=400&q=80",
  "Pasta with Marinara":
    "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=400&q=80",
  "Pasta with Alfredo":
    "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=400&q=80",
  "Caesar Salad":
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
  "Garden Salad":
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80",
  "Fruit Cup":
    "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
  "Soup of the Day":
    "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=80",
  Chili:
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80",
  "Cheese Pizza":
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
  "Pepperoni Pizza":
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
  Omelet:
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
  "Scrambled Eggs":
    "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80",
  Pancakes:
    "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=80",
  Waffles:
    "https://images.unsplash.com/photo-1551024601-0f07c2e59702?auto=format&fit=crop&w=400&q=80",
  "Yogurt Parfait":
    "https://images.unsplash.com/photo-1528838060463-3a0b54c4a3ab?auto=format&fit=crop&w=400&q=80",
  Brownies:
    "https://images.unsplash.com/photo-1606312619232-1ecb6f17032e?auto=format&fit=crop&w=400&q=80",
  "Chocolate Chip Cookies":
    "https://images.unsplash.com/photo-1548365328-9bdb072f3041?auto=format&fit=crop&w=400&q=80",
  "Turkey Sub":
    "https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=400&q=80",
  "Ham & Cheese Sandwich":
    "https://images.unsplash.com/photo-1540103713565-4a55a73215c0?auto=format&fit=crop&w=400&q=80",
  "Bagel with Cream Cheese":
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80",
  "Fried Rice":
    "https://images.unsplash.com/photo-1589307004173-3c95204d00f5?auto=format&fit=crop&w=400&q=80",
  "Stir Fry Noodles":
    "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=400&q=80",
  "Tofu Stir Fry":
    "https://images.unsplash.com/photo-1546069901-a8c6b68175e4?auto=format&fit=crop&w=400&q=80",
  "Sushi Roll":
    "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=400&q=80",
  "Ice Cream Sundae":
    "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=400&q=80",
  "Grilled Cheese":
    "https://images.unsplash.com/photo-1546961329-78bef0414d7c?auto=format&fit=crop&w=400&q=80",
  "Protein Smoothie":
    "https://images.unsplash.com/photo-1542444459-db63c4b6d6b1?auto=format&fit=crop&w=400&q=80",
  "Peanut Butter Smoothie":
    "https://images.unsplash.com/photo-1583225272828-60adbf08b922?auto=format&fit=crop&w=400&q=80",
  "Acai Bowl":
    "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80",
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80";

export function getImageForItem(item) {
  return ITEM_IMAGE_MAP[item] || DEFAULT_IMAGE;
}
