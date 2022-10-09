const config = require("config");
const parameters = config.get("generate");

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

// Define all Captain Chad attributes
exports.globalAttributes = [
  {
    trait_type: "helmet",
    values: [
      { value: "classic", probability: parameters.helmet.classic },
      { value: "racer", probability: parameters.helmet.racer },
      { value: "punk", probability: parameters.helmet.punk },
      { value: "knight", probability: parameters.helmet.knight },
      { value: "geek", probability: parameters.helmet.geek },
    ],
  },
  {
    trait_type: "patch",
    values: [
      { value: "livepeer", probability: parameters.patch.livepeer },
      { value: "nimbus", probability: parameters.patch.livepeer },
      { value: "teku", probability: parameters.patch.livepeer },
      { value: "lighthouse", probability: parameters.patch.livepeer },
      { value: "prysm", probability: parameters.patch.livepeer },
      { value: "rocketpool", probability: parameters.patch.livepeer },
    ],
  },
  {
    trait_type: "backpack",
    values: [
      { value: "yes", probability: parameters.backpack.yes },
      { value: "no", probability: parameters.backpack.no },
    ],
  },
  {
    trait_type: "panel",
    values: [
      { value: "yes", probability: parameters.panel.yes },
      { value: "no", probability: parameters.panel.no },
    ],
  },
  {
    trait_type: "background",
    values: [
      { value: "planets", probability: parameters.background.planets },
      { value: "system", probability: parameters.background.system },
      { value: "playful", probability: parameters.background.playful },
      { value: "moon", probability: parameters.background.moon },
      { value: "galaxy", probability: parameters.background.galaxy },
      { value: "chip", probability: parameters.background.chip },
    ],
  },
  {
    trait_type: "background complexity",
    values: [
      { value: 1, probability: parameters.backgroundComplexity.complex },
      { value: 2, probability: parameters.backgroundComplexity.med },
      { value: 3, probability: parameters.backgroundComplexity.low },
      { value: 4, probability: parameters.backgroundComplexity.basic },
    ],
  },
];
