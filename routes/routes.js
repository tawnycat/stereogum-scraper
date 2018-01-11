var controller = require("../controllers/controller.js");

module.exports = function (app, request) {

// Home route which loads scraped articles

app.get("/", controller.loadArticles);

// Scrape route

app.get("/scrape", controller.scrape);

// View comments route

app.get("/articles/:id", controller.grabComments);

// Save or update comment route

app.post("/articles/:id", controller.addComments);

}