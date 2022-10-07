const name = require("random-name");
const {
  pickRandomArrayEntry,
  pickRandomAttributes,
  randomNumberBetween,
  globalAttributes,
  heavenlyBodies,
  getColorName,
} = require("../modules/helpers");
const svgFromAttributes = require("./svg-generator");

// ///////////////////////////////
// Rocketeer generator
// ///////////////////////////////
async function generateRocketeer(id) {
  // The base object of a new Rocketeer
  const rocketeer = {
    name: `${name.first()} ${name.middle()} ${name.last()} of ${
      id % 42 == 0 ? "the Towel" : pickRandomArrayEntry(heavenlyBodies)
    }`,
    description: "",
    image: ``,
    attributes: [],
  };

  // Generate randomized attributes
  rocketeer.attributes = pickRandomAttributes(globalAttributes);

  // Set birthday
  rocketeer.attributes.push({
    display_type: "date",
    trait_type: "birthday",
    value: Math.floor(Date.now() / 1000),
  });

  // Create description
  rocketeer.description = `${rocketeer.name} is a proud member of the ${
    rocketeer.attributes.find(({ trait_type }) => trait_type == "patch").value
  } guild.`;

  // Generate color attributes
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

  // Generate, compile and upload image
  const { NODE_ENV: mode } = process.env;
  let path;
  if (mode == "production") {
    path = "/var/www/avatars/" + id;
  } else {
    path = "./output/" + id;
  }
  rocketeer.image = await svgFromAttributes(rocketeer.attributes, path);

  // Namify the attributes
  rocketeer.attributes = rocketeer.attributes.map((attribute) => {
    if (!attribute.trait_type.includes("color")) return attribute;
    return {
      ...attribute,
      value: getColorName(attribute.value),
    };
  });

  return rocketeer.name + ": `" + "' @ " + rocketeer.image;
}

module.exports = {
  generateRocketeer,
};
