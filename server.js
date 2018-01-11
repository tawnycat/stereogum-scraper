// Required packages
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var request = require("request");

// Port
var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

// Configure middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
var routes = require("./routes/routes.js")(app, request);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
