var exports = module.exports = {};

// Loads scraped articles

exports.loadArticles = function(req, res) {
    db.Article
        .find({})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
}

// Scrapes site for articles

exports.scrape = function(req, res) {
    request("http://www.stereogum.com/", function(error, response, html) {

        var $ = cheerio.load(html);

        $("div.preview-holder").each(function(i, element) {

            var result = {};

            result.title = $(element).find("h2").text();
            result.link = $(element).find("a").attr("href");

            db.Article
                .create(result)
                .then(function(dbArticle) {
                    res.send("Scrape Complete");
                })
                .catch(function(err) {
                    res.json(err);
                });
        });
    });
}

// Grabs article by unique ID and any attached comments 

exports.grabComments = function(req, res) {
    db.Article
        .findOne({ _id: req.params.id })

        .populate("comment")
        .then(function(dbArticle) {
            res.json(dbArticle);
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
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbComment._id }, { new: true });
        })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
}