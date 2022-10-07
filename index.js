const { generateRocketeer } = require("./nft-media/rocketeer");

(async () => {
  try {
    for (var id = 1; id <= 3475; id++) {
      console.log("Generating Cpn Chad " + id);
      console.log(await generateRocketeer(id));
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
