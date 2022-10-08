const masterPath = `${__dirname}/../assets/master.svg`;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs").promises;

module.exports = async function svgFromAttributes(attributes = [], path = "") {
  // Validations
  if (!path.length) throw new Error("svgFromAttributes missing path");
  if (!attributes.length)
    throw new Error("svgFromAttributes missing attributes");

  console.log("Checking attributes");

  // Get properties
  const { value: primary_color } = attributes.find(
    ({ trait_type }) => trait_type == "outfit color"
  );
  const { value: accent_color } = attributes.find(
    ({ trait_type }) => trait_type == "outfit accent color"
  );
  const { value: backpack_color } = attributes.find(
    ({ trait_type }) => trait_type == "backpack color"
  );
  const { value: visor_color } = attributes.find(
    ({ trait_type }) => trait_type == "visor color"
  );
  const { value: backpack } = attributes.find(
    ({ trait_type }) => trait_type == "backpack"
  );
  const { value: panel } = attributes.find(
    ({ trait_type }) => trait_type == "panel"
  );
  const { value: patch } = attributes.find(
    ({ trait_type }) => trait_type == "patch"
  );
  const { value: helmet } = attributes.find(
    ({ trait_type }) => trait_type == "helmet"
  );
  const { value: background } = attributes.find(
    ({ trait_type }) => trait_type == "background"
  );
  const { value: background_complexity } = attributes.find(
    ({ trait_type }) => trait_type == "background complexity"
  );

  console.log("Reading master file");

  // Generate DOM to work with
  const svgString = await fs.readFile(masterPath, { encoding: "utf8" });
  const {
    window: { document },
  } = new JSDOM(svgString);

  // ///////////////////////////////
  // Attribute selection
  // ///////////////////////////////
  console.log("Removing unused attributes from master");

  // Remove obsolete patches
  const obsoletePatches = [
    "livepeer",
    "nimbus",
    "teku",
    "lighthouse",
    "prysm",
    "rocketpool",
  ].filter((p) => p !== patch);
  for (let i = obsoletePatches.length - 1; i >= 0; i--) {
    const element = document.querySelector(`#${obsoletePatches[i]}`);
    if (element) element.remove();
    else console.log(`Could not find #${obsoletePatches[i]}`);
  }

  // Remove obsolete hemets
  const obsoleteHelmets = ["classic", "racer", "punk", "knight", "geek"].filter(
    (p) => p !== helmet
  );
  for (let i = obsoleteHelmets.length - 1; i >= 0; i--) {
    {
      let element = document.querySelector(`#${obsoleteHelmets[i]}` + "_front");
      if (element) element.remove();
      else console.log(`#${obsoleteHelmets[i]}` + "_front");
    }
    {
      let element = document.querySelector(`#${obsoleteHelmets[i]}` + "_back");
      if (element) element.remove();
      else console.log(`#${obsoleteHelmets[i]}` + "_back");
    }
  }

  // Remove panel if need be
  if (panel === "no") {
    const element = document.querySelector(`#panel`);
    if (element) element.remove();
    else console.log(`Could not find #panel`);
  }

  // Remove backpack if need be
  if (backpack === "no") {
    const element = document.querySelector(`#backpack`);
    if (element) element.remove();
    else console.log("Could not find #backpack");
  }

  // Remove obsolete backgrounds
  const obsoleteBackgrounds = [
    "planets",
    "system",
    "playful",
    "moon",
    "galaxy",
    "chip",
  ].filter((p) => p !== background);
  for (let i = obsoleteBackgrounds.length - 1; i >= 0; i--) {
    const element = document.querySelector(`#${obsoleteBackgrounds[i]}`);
    if (element) element.remove();
    else console.log(`Could not find #${obsoleteBackgrounds[i]}`);
  }

  // ///////////////////////////////
  // Background customisation
  // ///////////////////////////////

  // In playful, keeping things is basic, removing them is cool
  if (background === "playful") {
    const toRemove = background_complexity;
    for (let i = 1; i <= toRemove; i++) {
      const element = document.querySelector(`#playful-element-${5 - i}`);
      if (element) element.remove();
      else console.log(`Could not find #playful-element-${5 - i}`);
    }
  } else {
    // In others, keeping is cool, and removing is less cool
    // so higher rarity means less looping
    const toRemove = 4 - background_complexity;
    for (let i = 1; i <= toRemove; i++) {
      const element = document.querySelector(`#${background}-element-${5 - i}`);
      if (element) element.remove();
      else console.log(`Could not find #${background}-element-${5 - i}`);
    }
  }

  // ///////////////////////////////
  // Color substitutions
  // ///////////////////////////////
  console.log("Substituting colours from master");
  const defaultPrimary = /rgb\( ?252 ?, ?186 ?, ?157 ?\)/gi;
  const defaultVisor = /rgb\( ?71 ?, ?22 ?, ?127 ?\)/gi;
  const defaultAccent = /rgb\( ?243 ?, ?99 ?, ?113 ?\)/gi;
  const defaultBackpack = /rgb\( ?195 ?, ?178 ?, ?249 ?\)/gi;

  // Substitutions
  const replace = (from, to) => {
    const replaced = document.querySelector("svg").innerHTML.replace(from, to);
    document.querySelector("svg").innerHTML = replaced;
  };
  replace(defaultPrimary, primary_color);
  replace(defaultAccent, accent_color);
  replace(defaultVisor, visor_color);
  replace(defaultBackpack, backpack_color);

  console.log("Baking SVG now...");
  const bakedSvg = [
    `<?xml version="1.0" encoding="UTF-8" standalone="no"?>`,
    `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">`,
    document.querySelector("svg").outerHTML,
  ].join("");

  console.log("Writing to `" + path + ".svg`...");
  await fs.writeFile(`${path}.svg`, bakedSvg);

  // Return public url
  return "Paths: '" + `${path}.svg` + "'";
};
