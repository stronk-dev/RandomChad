const {
  pickRandomAttributes,
  randomNumberBetween,
  globalAttributes
} = require("../modules/helpers");
const svgFromAttributes = require("./svg-generator");

// Generates a random Chad names as basePath/id.svg
async function generateRocketeer(id, basePath) {
  const rocketeer = {
    image: ``,
    attributes: [],
  };
  // Pick random attributes based on configured probabilities
  rocketeer.attributes = pickRandomAttributes(globalAttributes);
  // Randomize colours
  rocketeer.attributes.push({
    trait_type: "outfit color",
    value: `rgb( ${randomNumberBetween(0, 255)}, ${randomNumberBetween(
      0,
      255
    )}, ${randomNumberBetween(0, 255)} )`,
  });
  rocketeer.attributes.push({
    trait_type: "outfit accent color",
    value: `rgb( ${randomNumberBetween(0, 255)}, ${randomNumberBetween(
      0,
      255
    )}, ${randomNumberBetween(0, 255)} )`,
  });
  rocketeer.attributes.push({
    trait_type: "backpack color",
    value: `rgb( ${randomNumberBetween(0, 255)}, ${randomNumberBetween(
      0,
      255
    )}, ${randomNumberBetween(0, 255)} )`,
  });
  rocketeer.attributes.push({
    trait_type: "visor color",
    value: `rgb( ${randomNumberBetween(0, 255)}, ${randomNumberBetween(
      0,
      255
    )}, ${randomNumberBetween(0, 255)} )`,
  });
  // Generate SVG
  let path = basePath + id;
  rocketeer.image = await svgFromAttributes(rocketeer.attributes, path);
  return "@" + rocketeer.image;
}

module.exports = {
  generateRocketeer,
};
