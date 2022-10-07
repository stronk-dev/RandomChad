require = require("esm")(module);
import express from 'express';

(async () => {
  try {
    // Web application framework
    const app = express();
    app.disable('x-powered-by');
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Error handler
    app.use(function(err, req, res, next) {
      res.locals.message = err.message;
      // Also log it to the console
      console.log(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      // Render the error page
      res.status(err.status || 500);
      res.render('error');
    });

    // Start listening on the defined port
    app.listen(4243, "0.0.0.0", function () {
      console.log(`Listening on port 4243`);
    });
  } catch (err) {
    console.log(err);
  }
})();