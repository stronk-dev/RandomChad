// ///////////////////////////////
// Helper functions
// ///////////////////////////////
exports.dev = !!process.env.development;
const log = (...messages) => {
  if (process.env.development) console.log(...messages);
};
exports.log = log;

// Wait in async
const wait = (timeInMs) =>
  new Promise((resolve) => setTimeout(resolve), timeInMs);
exports.wait = wait;

// Pick random item from an array
const pickRandomArrayEntry = (array) =>
  array[Math.floor(Math.random() * array.length)];
exports.pickRandomArrayEntry = pickRandomArrayEntry;

// Generate random number between x and y
exports.randomNumberBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Random attribute picker
exports.pickRandomAttributes = (attributes) => {
  // Decimal accuracy, if probabilities have the lowest 0.01 then 100 is enough, for 0.001 1000 is needed
  const probabilityDecimals = 3;

  // Remap the trait so it has a 'lottery ticket box' based on probs
  const attributeLottery = attributes.map(({ values, ...attribute }) => ({
    // Attribute meta stays the same
    ...attribute,
    // Values are reduced from objects with probabilities to an array with elements
    values: values.reduce((acc, val) => {
      const { probability, value } = val;

      // Map probabilities to a flat array of items
      const amountToAdd = 10 * probabilityDecimals * probability;
      for (let i = 0; i < amountToAdd; i++) acc.push(value);
      return acc;
    }, []),
  }));

  // Pick a random element from the lottery box array items
  return attributeLottery.map(({ values, ...attribute }) => ({
    // Attribute meta stays the same
    ...attribute,
    // Select random entry from array
    value: pickRandomArrayEntry(values),
  }));
};

const nameColor = require("color-namer");
const Color = require("color");
exports.getColorName = (rgb) => {
  try {
    return nameColor(rgb).basic[0].name;
  } catch (e) {
    return rgb;
  }
};
exports.getRgbArrayFromColorName = (name) => {
  const { hex } = nameColor(name).basic[0];
  const color = Color(hex);
  return color.rgb().array();
};

// ///////////////////////////////
// Attribute sources
// ///////////////////////////////
exports.globalAttributes = [
  {
    trait_type: "helmet",
    values: [
      { value: "classic", probability: 0.2 },
      { value: "racer", probability: 0.1 },
      { value: "punk", probability: 0.1 },
      { value: "knight", probability: 0.2 },
      { value: "geek", probability: 0.2 },
    ],
  },
  {
    trait_type: "patch",
    values: [
      { value: "livepeer", probability: 0.2 },
      { value: "nimbus", probability: 0.1 },
      { value: "teku", probability: 0.1 },
      { value: "lighthouse", probability: 0.1 },
      { value: "prysm", probability: 0.2 },
      { value: "rocketpool", probability: 0.3 },
    ],
  },
  {
    trait_type: "backpack",
    values: [
      { value: "yes", probability: 0.9 },
      { value: "no", probability: 0.1 },
    ],
  },
  {
    trait_type: "panel",
    values: [
      { value: "yes", probability: 0.9 },
      { value: "no", probability: 0.1 },
    ],
  },
  {
    trait_type: "background",
    values: [
      { value: "planets", probability: 0.2 },
      { value: "system", probability: 0.2 },
      { value: "playful", probability: 0.1 },
      { value: "moon", probability: 0.05 },
      { value: "galaxy", probability: 0.2 },
      { value: "chip", probability: 0.05 },
    ],
  },
  {
    trait_type: "background complexity",
    values: [
      { value: 1, probability: 0.05 },
      { value: 2, probability: 0.1 },
      { value: 3, probability: 0.1 },
      { value: 4, probability: 0.75 },
    ],
  },
];
exports.heavenlyBodies = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
  "the Moon",
  "the Sun",
];
