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
  
  app.get("/", controller.get_home_page);


  app.post("/comment", controller.post_comment);

};
