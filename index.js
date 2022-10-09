const config = require('config');
const iterations = config.get('control.iterations');
const threads = config.get('control.threads');
const minId = config.get('control.minId');
const maxId = config.get('control.maxId');
const basePath = config.get('control.path');
const { generateRocketeer } = require("./nft-media/rocketeer");

(async () => {
  try {
    // Sanity check on config variables
    let todo = iterations;
    if (isNaN(todo)){
      console.log("Cannot create `" + todo + "' amount Captain Chads");
      return;
    }else if (todo < 1){todo = 1;}
    if (minId >= maxId){return;}
    // Generate new Captain Chad's
    while (todo) {
      const id = Math.floor(Math.random() * (maxId) + minId)
      console.log("Generating Cpn Chad #" + id + " (" + todo-- + " left)");
      console.log(await generateRocketeer(id, basePath));
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
