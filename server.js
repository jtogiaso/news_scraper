// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const env = require('dotenv').load();
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 3300;
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");

//For BodyParser
// =============================================================
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


//For Morgan
// =============================================================
// Sets up the Express app to log request details
app.use(logger("dev"));


// Static directory
// =============================================================
app.use(express.static("./app/public"));


//For Handlebars
// =============================================================
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/app/views/layouts',
    extname: '.hbs'
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/app/views'));

// Routes
// =============================================================

require("./app/routes/routes.js")(app);


// Syncing our mongoose models and then starting our Express app
// =============================================================
 
//Sync Database
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/articles", {
  useMongoClient: true
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
