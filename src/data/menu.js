// src/data/menu.js

export const DINING_HALLS = [
  "Carson's Market",
  "Four Lakes Market",
  "Gordon's Market",
  "Liz's Market",
  "Lowell Market",
  "Rheta's Market",
  "Shake Smart"
];

const base = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;

// Map item name -> image URL
// (IDs chosen to be visually reasonable for each item)
const ITEM_IMAGES = {
  "Cheeseburger": base("photo-1550547660-d9450f859349"),
  // veggie burger: different image, not pizza-looking
  "Veggie Burger": base("photo-1551782450-a2132b4ba21d"),
  "Chicken Tenders": base("photo-1625944520301-9a4ac2740d37"),
  "Cheese Pizza": base("photo-1548365328-9da4b7f5809c"),
  "Pepperoni Pizza": base("photo-1548369937-47519962c11a"),
  "Veggie Pizza": base("photo-1541745537411-b8046dc6d66c"),
  "Mac and Cheese": base("photo-1513104890138-5c5c5f1049d4"),
  "Grilled Cheese": base("photo-1546549032-9571cd6b27df"),
  "Pasta with Marinara": base("photo-1589301760014-d929f3979dbc"),
  "Pasta with Alfredo": base("photo-1525755662778-989d0524087e"),
  "Caesar Salad": base("photo-1569058242560-93de6f1d475f"),
  "Garden Salad": base("photo-1512621776951-a57141f2eefd"),
  "Breakfast Burrito": base("photo-1608038509085-9c1c6c4b8d20"),
  "Pancakes": base("photo-1587731556938-38755b4803a6"),
  "Waffles": base("photo-1509482560494-4126f8225994"),
  "Scrambled Eggs": base("photo-1517959105821-eaf2591984c2"),
  "Omelet": base("photo-1528715471579-d1bcf0ba5e83"),
  "Fried Rice": base("photo-1604908176997-1251884b08a3"),
  "Stir Fry Noodles": base("photo-1604908176997-1251884b08a3"),
  "Tofu Stir Fry": base("photo-1546069901-ba9599a7e63c"),
  "Chicken Sandwich": base("photo-1562967914-608f82629710"),
  "Turkey Sub": base("photo-1612874742237-6526221588e3"),
  "Ham & Cheese Sandwich": base("photo-1543779502-4a9b021f6cce"),
  "Bagel with Cream Cheese": base("photo-1509440159596-0249088772ff"),
  "Yogurt Parfait": base("photo-1533777857889-4be7c70b33f7"),
  "Fruit Cup": base("photo-1540420773420-3366772f4999"),
  "Chili": base("photo-1534938665420-4193effeaccf"),
  "Sushi Roll": base("photo-1562158075-8ba5f42b1c89"),
  "Ice Cream Sundae": base("photo-1527515637462-cff94eecc1ac"),
  "Chocolate Chip Cookies": base("photo-1541976076758-25e062ca1920"),
  "Brownies": base("photo-1607958996333-41aef7caefaa")
};

export const ITEM_NAMES = Object.keys(ITEM_IMAGES);

const FALLBACK_IMAGE = base("photo-1504674900247-0877df9cc836");

export function getImageForItem(name) {
  if (!name) return FALLBACK_IMAGE;
  const key = name.trim();
  return ITEM_IMAGES[key] || FALLBACK_IMAGE;
}
