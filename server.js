// Required packages
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");

// Models
var db = require("./models");

// Port
var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Routes
var routes = require("./routes/routes.js")(app, request);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
