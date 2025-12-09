// src/data/seedReviews.js

// Seed reviews used across both the Reviews and Menus pages.
// IDs starting with "seed-" are treated as built-in data;
// user reviews are stored separately in localStorage.

export const INITIAL_REVIEWS = [
  // ========== FOUR LAKES MARKET ==========
  {
    id: "seed-1",
    hall: "Four Lakes Market",
    item: "Cheeseburger",
    rating: 4,
    wouldAgain: true,
    text: "Solid cheeseburger, bun can be a little dry but toppings are fresh.",
    author: "fourlakes-fan"
  },
  {
    id: "seed-2",
    hall: "Four Lakes Market",
    item: "Cheeseburger",
    rating: 2,
    wouldAgain: false,
    text: "Mine was lukewarm and the cheese barely melted.",
    author: "late-to-lunch"
  },
  {
    id: "seed-3",
    hall: "Four Lakes Market",
    item: "Cheeseburger",
    rating: 3,
    wouldAgain: false,
    text: "Edible, but the patty is pretty thin. Fries were better than the burger.",
    author: "burger-critic"
  },
  {
    id: "seed-4",
    hall: "Four Lakes Market",
    item: "Veggie Burger",
    rating: 3,
    wouldAgain: false,
    text: "Nice option if you're in a rush, but a bit mushy.",
    author: "plant-powered-badger"
  },
  {
    id: "seed-5",
    hall: "Four Lakes Market",
    item: "Veggie Burger",
    rating: 2,
    wouldAgain: false,
    text: "Texture was off and bun was soggy. Sauce helps a little.",
    author: "texture-enjoyer-not"
  },
  {
    id: "seed-6",
    hall: "Four Lakes Market",
    item: "Veggie Burger",
    rating: 4,
    wouldAgain: true,
    text: "Honestly pretty good with extra toppings and hot off the grill.",
    author: "veg-head"
  },
  {
    id: "seed-7",
    hall: "Four Lakes Market",
    item: "Chicken Tenders",
    rating: 5,
    wouldAgain: true,
    text: "Crispy, hot, and actually seasoned. Elite late-night option.",
    author: "late-night-lakes"
  },
  {
    id: "seed-8",
    hall: "Four Lakes Market",
    item: "Chicken Tenders",
    rating: 3,
    wouldAgain: true,
    text: "Great when fresh, mid when they've been sitting under the lamp.",
    author: "heat-lamp-hater"
  },
  {
    id: "seed-9",
    hall: "Four Lakes Market",
    item: "Chicken Tenders",
    rating: 2,
    wouldAgain: false,
    text: "Mine were dry and overcooked. Sauce saved them a bit.",
    author: "tender-skeptic"
  },
  {
    id: "seed-10",
    hall: "Four Lakes Market",
    item: "Pasta with Marinara",
    rating: 4,
    wouldAgain: true,
    text: "Sauce is basic but decent, good portion size.",
    author: "pasta-person"
  },
  {
    id: "seed-11",
    hall: "Four Lakes Market",
    item: "Pasta with Marinara",
    rating: 3,
    wouldAgain: false,
    text: "Noodles were slightly overcooked, but still fine with parmesan.",
    author: "al-dente-enjoyer"
  },
  {
    id: "seed-12",
    hall: "Four Lakes Market",
    item: "Pasta with Alfredo",
    rating: 3,
    wouldAgain: false,
    text: "Too heavy and a little bland, would skip unless starving.",
    author: "cream-overload"
  },
  {
    id: "seed-13",
    hall: "Four Lakes Market",
    item: "Pasta with Alfredo",
    rating: 1,
    wouldAgain: false,
    text: "Sauce was gluey and weirdly sweet. Hard pass.",
    author: "alfredo-anti"
  },
  {
    id: "seed-14",
    hall: "Four Lakes Market",
    item: "Caesar Salad",
    rating: 4,
    wouldAgain: true,
    text: "Crunchy lettuce, dressing is salty but in a good way.",
    author: "salad-simp"
  },
  {
    id: "seed-15",
    hall: "Four Lakes Market",
    item: "Caesar Salad",
    rating: 2,
    wouldAgain: false,
    text: "Lots of croutons, not much lettuce. Dressing was watered down.",
    author: "roughage-enjoyer"
  },
  {
    id: "seed-16",
    hall: "Four Lakes Market",
    item: "Fruit Cup",
    rating: 5,
    wouldAgain: true,
    text: "Surprisingly fresh, good mix of fruit and not all melon.",
    author: "vitamin-c-enjoyer"
  },
  {
    id: "seed-17",
    hall: "Four Lakes Market",
    item: "Fruit Cup",
    rating: 3,
    wouldAgain: true,
    text: "Depends on the day; decent snack between classes.",
    author: "quick-snack"
  },

  // ========== GORDON'S MARKET ==========
  {
    id: "seed-18",
    hall: "Gordon's Market",
    item: "Chicken Sandwich",
    rating: 4,
    wouldAgain: true,
    text: "When it's hot, it slaps. When it's not, it's mid.",
    author: "gordons-regular"
  },
  {
    id: "seed-19",
    hall: "Gordon's Market",
    item: "Chicken Sandwich",
    rating: 2,
    wouldAgain: false,
    text: "Mine was dry and the lettuce was sad. Wouldn't recommend at rush hour.",
    author: "sandwich-sadness"
  },
  {
    id: "seed-20",
    hall: "Gordon's Market",
    item: "Chicken Sandwich",
    rating: 3,
    wouldAgain: true,
    text: "Pretty average sandwich. Ask for extra sauce and it’s fine.",
    author: "condiment-maxxer"
  },
  {
    id: "seed-21",
    hall: "Gordon's Market",
    item: "Chicken Tenders",
    rating: 5,
    wouldAgain: true,
    text: "Peak comfort food. Crisp outside, juicy inside.",
    author: "tender-enjoyer"
  },
  {
    id: "seed-22",
    hall: "Gordon's Market",
    item: "Chicken Tenders",
    rating: 4,
    wouldAgain: true,
    text: "Portion size is great, fries can be hit or miss.",
    author: "fries-optional"
  },
  {
    id: "seed-23",
    hall: "Gordon's Market",
    item: "Chicken Tenders",
    rating: 2,
    wouldAgain: false,
    text: "All breading, not much chicken. Kind of disappointing.",
    author: "breading-overload"
  },
  {
    id: "seed-24",
    hall: "Gordon's Market",
    item: "Mac and Cheese",
    rating: 4,
    wouldAgain: true,
    text: "Super cheesy, could use a bit more seasoning.",
    author: "mac-maxxer"
  },
  {
    id: "seed-25",
    hall: "Gordon's Market",
    item: "Mac and Cheese",
    rating: 3,
    wouldAgain: true,
    text: "Starts out great but congeals if you talk too long.",
    author: "chatty-eater"
  },
  {
    id: "seed-26",
    hall: "Gordon's Market",
    item: "Mac and Cheese",
    rating: 1,
    wouldAgain: false,
    text: "Tasted like plain noodles in yellow sauce. No thanks.",
    author: "mac-hater"
  },
  {
    id: "seed-27",
    hall: "Gordon's Market",
    item: "Cheese Pizza",
    rating: 3,
    wouldAgain: true,
    text: "Standard dining hall pizza, best right out of the oven.",
    author: "pizza-on-campus"
  },
  {
    id: "seed-28",
    hall: "Gordon's Market",
    item: "Cheese Pizza",
    rating: 2,
    wouldAgain: false,
    text: "Very greasy and the crust was floppy when I got it.",
    author: "flop-dodger"
  },
  {
    id: "seed-29",
    hall: "Gordon's Market",
    item: "Pepperoni Pizza",
    rating: 4,
    wouldAgain: true,
    text: "Greasy but in a satisfying way. Late study fuel.",
    author: "midterm-survivor"
  },
  {
    id: "seed-30",
    hall: "Gordon's Market",
    item: "Pepperoni Pizza",
    rating: 3,
    wouldAgain: true,
    text: "Sometimes the pepperoni is crispy, sometimes chewy.",
    author: "pepperoni-purist"
  },
  {
    id: "seed-31",
    hall: "Gordon's Market",
    item: "Garden Salad",
    rating: 3,
    wouldAgain: false,
    text: "Okay as a side, nothing special. Sometimes wilted.",
    author: "trying-to-be-healthy"
  },
  {
    id: "seed-32",
    hall: "Gordon's Market",
    item: "Garden Salad",
    rating: 2,
    wouldAgain: false,
    text: "Lots of iceberg, not many other veggies.",
    author: "variety-seeker"
  },
  {
    id: "seed-33",
    hall: "Gordon's Market",
    item: "Chili",
    rating: 4,
    wouldAgain: true,
    text: "Nice on a cold day, decent spice level.",
    author: "chili-chaser"
  },
  {
    id: "seed-34",
    hall: "Gordon's Market",
    item: "Chili",
    rating: 3,
    wouldAgain: true,
    text: "More beans than meat, but still comforting.",
    author: "bean-enjoyer"
  },
  {
    id: "seed-35",
    hall: "Gordon's Market",
    item: "Chocolate Chip Cookies",
    rating: 5,
    wouldAgain: true,
    text: "Warm, soft, and dangerous. Easy to eat three.",
    author: "cookie-bandit"
  },
  {
    id: "seed-36",
    hall: "Gordon's Market",
    item: "Chocolate Chip Cookies",
    rating: 4,
    wouldAgain: true,
    text: "Sometimes overbaked, but still good with milk.",
    author: "cookie-critic"
  },

  // ========== RHETA'S MARKET ==========
  {
    id: "seed-37",
    hall: "Rheta's Market",
    item: "Omelet",
    rating: 5,
    wouldAgain: true,
    text: "Customizable and filling, best breakfast on campus.",
    author: "eggs-for-days"
  },
  {
    id: "seed-38",
    hall: "Rheta's Market",
    item: "Omelet",
    rating: 3,
    wouldAgain: true,
    text: "Depends who’s on the grill. Sometimes a little under-seasoned.",
    author: "griddle-gambler"
  },
  {
    id: "seed-39",
    hall: "Rheta's Market",
    item: "Scrambled Eggs",
    rating: 3,
    wouldAgain: false,
    text: "Kind of rubbery if you miss the fresh batch.",
    author: "sleepy-bruncher"
  },
  {
    id: "seed-40",
    hall: "Rheta's Market",
    item: "Scrambled Eggs",
    rating: 2,
    wouldAgain: false,
    text: "Weird texture, but hot sauce helps.",
    author: "sauce-fixer"
  },
  {
    id: "seed-41",
    hall: "Rheta's Market",
    item: "Pancakes",
    rating: 4,
    wouldAgain: true,
    text: "Fluffy enough, syrup carries.",
    author: "syrup-enjoyer"
  },
  {
    id: "seed-42",
    hall: "Rheta's Market",
    item: "Pancakes",
    rating: 2,
    wouldAgain: false,
    text: "Kind of gummy when they sit for a while.",
    author: "texture-sensitive"
  },
  {
    id: "seed-43",
    hall: "Rheta's Market",
    item: "Waffles",
    rating: 4,
    wouldAgain: true,
    text: "Self-serve waffle setup is fun, texture is solid.",
    author: "waffle-warrior"
  },
  {
    id: "seed-44",
    hall: "Rheta's Market",
    item: "Waffles",
    rating: 3,
    wouldAgain: true,
    text: "Sometimes undercooked in the middle if you're impatient.",
    author: "waffle-impatient"
  },
  {
    id: "seed-45",
    hall: "Rheta's Market",
    item: "Yogurt Parfait",
    rating: 5,
    wouldAgain: true,
    text: "Good balance of granola to yogurt, fruit is usually fresh.",
    author: "light-breakfast"
  },
  {
    id: "seed-46",
    hall: "Rheta's Market",
    item: "Yogurt Parfait",
    rating: 3,
    wouldAgain: true,
    text: "Granola can be a little stale, but still solid.",
    author: "granola-checker"
  },
  {
    id: "seed-47",
    hall: "Rheta's Market",
    item: "Brownies",
    rating: 4,
    wouldAgain: true,
    text: "Dense and fudgy, a bit sweet but hits the spot.",
    author: "dessert-devotee"
  },
  {
    id: "seed-48",
    hall: "Rheta's Market",
    item: "Brownies",
    rating: 2,
    wouldAgain: false,
    text: "Mine was super dry on the edges.",
    author: "brownie-purist"
  },

  // ========== CARSON'S MARKET ==========
  {
    id: "seed-49",
    hall: "Carson's Market",
    item: "Turkey Sub",
    rating: 4,
    wouldAgain: true,
    text: "Nice grab-and-go option, bread is usually soft.",
    author: "carsons-commuter"
  },
  {
    id: "seed-50",
    hall: "Carson's Market",
    item: "Turkey Sub",
    rating: 3,
    wouldAgain: true,
    text: "Good with extra veggies, but a bit plain otherwise.",
    author: "sandwich-customizer"
  },
  {
    id: "seed-51",
    hall: "Carson's Market",
    item: "Ham & Cheese Sandwich",
    rating: 3,
    wouldAgain: false,
    text: "Very standard sandwich, nothing to write home about.",
    author: "sandwich-neutral"
  },
  {
    id: "seed-52",
    hall: "Carson's Market",
    item: "Ham & Cheese Sandwich",
    rating: 2,
    wouldAgain: false,
    text: "Cheese didn’t melt and the ham tasted watery.",
    author: "ham-hater"
  },
  {
    id: "seed-53",
    hall: "Carson's Market",
    item: "Bagel with Cream Cheese",
    rating: 4,
    wouldAgain: true,
    text: "Bagels can be hit or miss, but when fresh they’re great.",
    author: "morning-walker"
  },
  {
    id: "seed-54",
    hall: "Carson's Market",
    item: "Bagel with Cream Cheese",
    rating: 2,
    wouldAgain: false,
    text: "Stale bagel, cream cheese helped but still meh.",
    author: "bagel-snob"
  },
  {
    id: "seed-55",
    hall: "Carson's Market",
    item: "Garden Salad",
    rating: 3,
    wouldAgain: false,
    text: "Basic salad bar vibes, okay as a side.",
    author: "greens-on-the-side"
  },
  {
    id: "seed-56",
    hall: "Carson's Market",
    item: "Soup of the Day",
    rating: 4,
    wouldAgain: true,
    text: "Rotates a lot, but usually comforting and warm.",
    author: "soup-enjoyer"
  },
  {
    id: "seed-57",
    hall: "Carson's Market",
    item: "Soup of the Day",
    rating: 2,
    wouldAgain: false,
    text: "One day it tasted like straight salt. Check before committing.",
    author: "sodium-aware"
  },
  {
    id: "seed-58",
    hall: "Carson's Market",
    item: "Chocolate Chip Cookies",
    rating: 4,
    wouldAgain: true,
    text: "Not quite as good as Gordon’s but still very solid.",
    author: "cookie-tourist"
  },

  // ========== LIZ'S MARKET ==========
  {
    id: "seed-59",
    hall: "Liz's Market",
    item: "Fried Rice",
    rating: 4,
    wouldAgain: true,
    text: "Good mix of veggies and egg, can be a bit oily.",
    author: "stirfry-lover"
  },
  {
    id: "seed-60",
    hall: "Liz's Market",
    item: "Fried Rice",
    rating: 2,
    wouldAgain: false,
    text: "Rice was dry and clumpy the day I tried it.",
    author: "rice-texture-enjoyer"
  },
  {
    id: "seed-61",
    hall: "Liz's Market",
    item: "Stir Fry Noodles",
    rating: 5,
    wouldAgain: true,
    text: "Best thing here when fresh, nice texture and flavor.",
    author: "noodle-maxxer"
  },
  {
    id: "seed-62",
    hall: "Liz's Market",
    item: "Stir Fry Noodles",
    rating: 3,
    wouldAgain: true,
    text: "Sometimes a bit too saucy, but still good.",
    author: "sauce-okay"
  },
  {
    id: "seed-63",
    hall: "Liz's Market",
    item: "Tofu Stir Fry",
    rating: 4,
    wouldAgain: true,
    text: "Tofu actually has some flavor, good veg option.",
    author: "plant-based-badger"
  },
  {
    id: "seed-64",
    hall: "Liz's Market",
    item: "Tofu Stir Fry",
    rating: 2,
    wouldAgain: false,
    text: "Tofu was spongy and under-seasoned the day I went.",
    author: "tofu-picky"
  },
  {
    id: "seed-65",
    hall: "Liz's Market",
    item: "Sushi Roll",
    rating: 3,
    wouldAgain: false,
    text: "Fine if you’re desperate for sushi, but rice texture is mid.",
    author: "sushi-snob"
  },
  {
    id: "seed-66",
    hall: "Liz's Market",
    item: "Sushi Roll",
    rating: 2,
    wouldAgain: false,
    text: "Seaweed was chewy and rice was cold.",
    author: "roll-regret"
  },
  {
    id: "seed-67",
    hall: "Liz's Market",
    item: "Fruit Cup",
    rating: 4,
    wouldAgain: true,
    text: "Decent mix, not just all honeydew.",
    author: "fruit-enjoyer"
  },
  {
    id: "seed-68",
    hall: "Liz's Market",
    item: "Ice Cream Sundae",
    rating: 5,
    wouldAgain: true,
    text: "Ice cream bar is goated, toppings are fun.",
    author: "sundae-simp"
  },
  {
    id: "seed-69",
    hall: "Liz's Market",
    item: "Ice Cream Sundae",
    rating: 3,
    wouldAgain: true,
    text: "Sometimes the soft serve is too melty, but still good.",
    author: "soft-serve-monitor"
  },

  // ========== LOWELL MARKET ==========
  {
    id: "seed-70",
    hall: "Lowell Market",
    item: "Grilled Cheese",
    rating: 4,
    wouldAgain: true,
    text: "Cheesy and satisfying, especially with tomato soup if available.",
    author: "comfort-food-core"
  },
  {
    id: "seed-71",
    hall: "Lowell Market",
    item: "Grilled Cheese",
    rating: 2,
    wouldAgain: false,
    text: "Burnt outside, cold cheese inside. Rough.",
    author: "grilled-cheese-critic"
  },
  {
    id: "seed-72",
    hall: "Lowell Market",
    item: "Mac and Cheese",
    rating: 3,
    wouldAgain: true,
    text: "Good but sometimes congeals under the heat lamps.",
    author: "mac-again"
  },
  {
    id: "seed-73",
    hall: "Lowell Market",
    item: "Mac and Cheese",
    rating: 2,
    wouldAgain: false,
    text: "Very bland, needed a ton of salt and pepper.",
    author: "seasoning-advocate"
  },
  {
    id: "seed-74",
    hall: "Lowell Market",
    item: "Chicken Sandwich",
    rating: 4,
    wouldAgain: true,
    text: "Crispy chicken, toppings are decent.",
    author: "lowell-lunch"
  },
  {
    id: "seed-75",
    hall: "Lowell Market",
    item: "Chicken Sandwich",
    rating: 3,
    wouldAgain: true,
    text: "Not amazing but gets the job done.",
    author: "lunch-rush"
  },
  {
    id: "seed-76",
    hall: "Lowell Market",
    item: "Caesar Salad",
    rating: 3,
    wouldAgain: false,
    text: "Needs more dressing and less crouton dust.",
    author: "salad-honest"
  },
  {
    id: "seed-77",
    hall: "Lowell Market",
    item: "Brownies",
    rating: 5,
    wouldAgain: true,
    text: "Warm and gooey when fresh, absolute W.",
    author: "brownie-enjoyer"
  },
  {
    id: "seed-78",
    hall: "Lowell Market",
    item: "Brownies",
    rating: 3,
    wouldAgain: true,
    text: "Still good even when cooled down, just less special.",
    author: "sweet-tooth"
  },

  // ========== SHAKE SMART ==========
  {
    id: "seed-79",
    hall: "Shake Smart",
    item: "Protein Smoothie",
    rating: 5,
    wouldAgain: true,
    text: "Tastes like dessert but hits protein goals, clutch post-gym.",
    author: "gym-badger"
  },
  {
    id: "seed-80",
    hall: "Shake Smart",
    item: "Protein Smoothie",
    rating: 3,
    wouldAgain: true,
    text: "A bit thick to drink fast, but solid overall.",
    author: "slow-sipper"
  },
  {
    id: "seed-81",
    hall: "Shake Smart",
    item: "Protein Smoothie",
    rating: 2,
    wouldAgain: false,
    text: "Powdery aftertaste, maybe they didn’t blend it enough.",
    author: "texture-sensitive-gymrat"
  },
  {
    id: "seed-82",
    hall: "Shake Smart",
    item: "Acai Bowl",
    rating: 4,
    wouldAgain: true,
    text: "Refreshing, toppings are nice, a bit pricey-feeling though.",
    author: "acai-addict"
  },
  {
    id: "seed-83",
    hall: "Shake Smart",
    item: "Acai Bowl",
    rating: 3,
    wouldAgain: true,
    text: "Good flavor, wish there was more granola.",
    author: "granola-hunter"
  },
  {
    id: "seed-84",
    hall: "Shake Smart",
    item: "Peanut Butter Smoothie",
    rating: 5,
    wouldAgain: true,
    text: "Thick, peanut-buttery, feels like a milkshake.",
    author: "pb-enjoyer"
  },
  {
    id: "seed-85",
    hall: "Shake Smart",
    item: "Peanut Butter Smoothie",
    rating: 3,
    wouldAgain: true,
    text: "Good but super filling. Split it if you’re not hungry.",
    author: "bulk-accident"
  },
  {
    id: "seed-86",
    hall: "Shake Smart",
    item: "Yogurt Parfait",
    rating: 4,
    wouldAgain: true,
    text: "Good when you want something light but still filling.",
    author: "light-lift"
  },
  {
    id: "seed-87",
    hall: "Shake Smart",
    item: "Yogurt Parfait",
    rating: 2,
    wouldAgain: false,
    text: "Granola was stale last time, kind of ruined it.",
    author: "granola-grim"
  },

  // Extra distributed low / mid reviews to make stats more varied
  {
    id: "seed-88",
    hall: "Four Lakes Market",
    item: "Cheeseburger",
    rating: 1,
    wouldAgain: false,
    text: "Completely burnt, not sure what happened in the kitchen.",
    author: "unlucky-badger"
  },
  {
    id: "seed-89",
    hall: "Four Lakes Market",
    item: "Pasta with Marinara",
    rating: 2,
    wouldAgain: false,
    text: "Very watery sauce, tasted like canned tomatoes.",
    author: "sauce-snob"
  },
  {
    id: "seed-90",
    hall: "Gordon's Market",
    item: "Mac and Cheese",
    rating: 3,
    wouldAgain: true,
    text: "Good late-night carb bomb, nothing gourmet.",
    author: "midnight-snacker"
  },
  {
    id: "seed-91",
    hall: "Gordon's Market",
    item: "Chicken Sandwich",
    rating: 1,
    wouldAgain: false,
    text: "Chicken was pink in the middle. Yikes.",
    author: "never-again"
  },
  {
    id: "seed-92",
    hall: "Rheta's Market",
    item: "Pancakes",
    rating: 3,
    wouldAgain: true,
    text: "Fine with fruit on top, plain they’re a little boring.",
    author: "topping-enjoyer"
  },
  {
    id: "seed-93",
    hall: "Rheta's Market",
    item: "Omelet",
    rating: 2,
    wouldAgain: false,
    text: "Undercooked veggies inside, cheese not melted.",
    author: "omelet-snob"
  },
  {
    id: "seed-94",
    hall: "Carson's Market",
    item: "Turkey Sub",
    rating: 2,
    wouldAgain: false,
    text: "Very little turkey and way too much mayo.",
    author: "mayo-critic"
  },
  {
    id: "seed-95",
    hall: "Liz's Market",
    item: "Stir Fry Noodles",
    rating: 2,
    wouldAgain: false,
    text: "Overcooked noodles, sauce tasted mostly like soy.",
    author: "noodle-purist"
  },
  {
    id: "seed-96",
    hall: "Lowell Market",
    item: "Grilled Cheese",
    rating: 3,
    wouldAgain: true,
    text: "Simple but does the job, especially with tomato soup.",
    author: "simple-comfort"
  },
  {
    id: "seed-97",
    hall: "Shake Smart",
    item: "Protein Smoothie",
    rating: 4,
    wouldAgain: true,
    text: "Great macros, taste is decent if you like protein powder.",
    author: "nutrition-focused"
  },
  {
    id: "seed-98",
    hall: "Four Lakes Market",
    item: "Chicken Tenders",
    rating: 4,
    wouldAgain: true,
    text: "Not as crispy as Gordon’s but still a W.",
    author: "tender-tourist"
  },
  {
    id: "seed-99",
    hall: "Gordon's Market",
    item: "Pepperoni Pizza",
    rating: 1,
    wouldAgain: false,
    text: "Cold slice that tasted like cardboard.",
    author: "slice-regret"
  },
  {
    id: "seed-100",
    hall: "Liz's Market",
    item: "Fried Rice",
    rating: 3,
    wouldAgain: true,
    text: "Decent if you mix it with the stir fry veggies.",
    author: "diy-mixer"
  },
  {
    id: "seed-101",
    hall: "Carson's Market",
    item: "Chocolate Chip Cookies",
    rating: 3,
    wouldAgain: true,
    text: "Pretty standard cookie, good with coffee.",
    author: "coffee-cookie-combo"
  },
  {
    id: "seed-102",
    hall: "Lowell Market",
    item: "Mac and Cheese",
    rating: 1,
    wouldAgain: false,
    text: "Tasted like plain pasta water. Needed serious help.",
    author: "mac-fumble"
  },
  {
    id: "seed-103",
    hall: "Rheta's Market",
    item: "Yogurt Parfait",
    rating: 2,
    wouldAgain: false,
    text: "Mostly yogurt, barely any fruit.",
    author: "fruit-seeker"
  },
  {
    id: "seed-104",
    hall: "Shake Smart",
    item: "Acai Bowl",
    rating: 2,
    wouldAgain: false,
    text: "Lots of ice chunks in mine, not blended well.",
    author: "blender-critic"
  },
  {
    id: "seed-105",
    hall: "Four Lakes Market",
    item: "Caesar Salad",
    rating: 3,
    wouldAgain: true,
    text: "Good if you grab it right when they restock.",
    author: "timing-is-everything"
  },
  {
    id: "seed-106",
    hall: "Gordon's Market",
    item: "Chili",
    rating: 2,
    wouldAgain: false,
    text: "Too salty and weird texture.",
    author: "chili-skeptic"
  },
  {
    id: "seed-107",
    hall: "Liz's Market",
    item: "Ice Cream Sundae",
    rating: 4,
    wouldAgain: true,
    text: "Best dessert if you want to treat yourself.",
    author: "treat-yourself"
  },
  {
    id: "seed-108",
    hall: "Carson's Market",
    item: "Bagel with Cream Cheese",
    rating: 3,
    wouldAgain: true,
    text: "Average bagel, but nice grab-and-go breakfast.",
    author: "commuter-breakfast"
  },
  {
    id: "seed-109",
    hall: "Lowell Market",
    item: "Chicken Sandwich",
    rating: 2,
    wouldAgain: false,
    text: "Breading was soggy and bun fell apart.",
    author: "sandwich-sad"
  },
  {
    id: "seed-110",
    hall: "Shake Smart",
    item: "Yogurt Parfait",
    rating: 3,
    wouldAgain: true,
    text: "Pretty good, but I wish the portion was bigger.",
    author: "portion-critic"
  }
];

// --- Rating-based tuning for wouldAgain on seed reviews ---
// Goal: higher ratings -> more likely "Yes", lower ratings -> more likely "No",
// with an overall "Yes" rate of roughly ~60% across the seed data.

(function retuneSeedOrderAgain() {
  if (!Array.isArray(INITIAL_REVIEWS)) return;

  let idx = 0;

  for (const review of INITIAL_REVIEWS) {
    const rating = Number(review.rating || 0);

    // Probabilities:
    // 4–5 stars → ~80% yes
    // 3 stars   → ~60% yes
    // 1–2 stars → ~30% yes
    let yesProb;
    if (rating >= 4) {
      yesProb = 0.8;
    } else if (rating === 3) {
      yesProb = 0.6;
    } else {
      yesProb = 0.3;
    }

    // Deterministic pseudo-random based on index, so it’s stable across reloads
    const bucket = ((idx * 37 + 17) % 100) / 100;

    // IMPORTANT: your seed data uses `wouldAgain`, not `wouldOrderAgain`
    review.wouldAgain = bucket < yesProb;

    idx += 1;
  }
})();
