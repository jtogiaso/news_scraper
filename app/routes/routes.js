// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
const controller = require("../controllers/controller.js");

// Routes
// =============================================================
module.exports = function(app) {
// ===============================================================================
  
  app.get("/", controller.home);

  app.get("/scrape", controller.scrape);

  app.post("/comment", controller.post_comment);

};
