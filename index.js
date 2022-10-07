const { generateRocketeer } = require("./nft-media/rocketeer");

(async () => {
  try {
    while (true) {
      const id = Math.floor(Math.random() * (999998) + 1)
      console.log("Generating Cpn Chad " + id);
      console.log(await generateRocketeer(id));
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
