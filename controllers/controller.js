// Required modules

var db = require("../models");
var cheerio = require("cheerio");
var request = require("request");

var exports = module.exports = {};

// Loads scraped articles

exports.loadArticles = function(req, res) {
    console.log("loading home page");
    db.Article
        .find({})
        .limit(10)
        .sort({date: -1})
        .then(function(dbArticle) {
            console.log(dbArticle);
            res.render("articlehome", { article: dbArticle });
        })
        .catch(function(err) {
            res.json(err);
        });
}

// Scrapes site for articles

exports.scrape = function(req, res) {

    console.log("about to scrape");
    request("http://www.stereogum.com/", function(error, response, html) {

        var $ = cheerio.load(html);

        $("div.preview-holder").each(function(i, element) {


            var result = {};

            result.title = $(element).find("h2").text();
            result.link = $(element).find("a").attr("href");
            result.preview = $(element).find(".preview").text();

            var possibleMatch;

            db.Article
                .find({ link: result.link })
                .then(function(dbArticle) {
                        if (dbArticle.length === 0) {
                            db.Article
                                .create(result)
                                .then(function(dbArticle) {
                                    console.log("scrape complete");
                                })
                                .catch(function(err) {
                                    res.json(err);
                                });
                        } else {
                            return;
                        }
                })
        });
    });
}

// Grabs article by unique ID and any attached comments 

exports.grabComments = function(req, res) {
    console.log(req);
    db.Article
        .findOne({ _id: req.params.id })

        .populate("comment")
        .then(function(dbArticle) {
            res.json(dbArticle.comment);
        })
        .catch(function(err) {
            res.json(err);
        });
}

// Save or update comments attached to specific article

exports.addComments = function(req, res) {

    db.Comment
        .create(req.body)
        .then(function(dbComment) {
            console.log("comment is in the database");
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });

        })
        .catch(function(err) {
            res.json(err);
        });
}