var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;
// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets up handlebars to render HTML pages
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Needed to load static files in public folder
app.use(express.static("public"));

// Database configuration
mongoose.connect("mongodb://localhost/NewsScraper", {
  useNewUrlParser: true
});

//Routes
var routes = require("./routes/html-routes");
app.use(routes);

app.get("/scrape", (req, res) => {
  axios
    .get("http://www.northwesternflipside.net/author/mcampbell/")
    .then(response => {
      var $ = cheerio.load(response.data);

      $("#content article").each((i, element) => {
        var result = {};

        result.title = $(element)
          .find("h2.post-title")
          .find("a")
          .text();

        result.summary = $(element)
          .find("div.entry")
          .find("p")
          .text();

        result.url = $(element)
          .find("h2.post-title")
          .find("a")
          .attr("href");

        result.image = $(element)
          .find("img")
          .attr("src");

        db.Article.create(result)
          .then(dbArticle => {
            console.log(dbArticle);
          })
          .catch(err => {
            console.log(err);
          });
      });
      res.send("scrape complete");
    });
});

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  db.Article.find({}, function(err, data) {
    console.log(data);
    res.json(data);
  });
});

app.get("/articles/:id", (req, res) => {
  var id = req.params.id;

  db.Article.findOne({ _id: id })
    .populate("comment")
    .then(dbArticle => {
      console.log("ARTICLES: ", dbArticle);
      res.json(dbArticle);
    });
});

app.post("/articles/:id", (req, res) => {
  var id = req.params.id;
  console.log(req.body);
  db.Comment.create({ title: req.body.title, body: req.body.body })
    .then(dbComment => {
      console.log(dbComment);
      return db.Article.findOneAndUpdate(
        { _id: id },
        { $push: { comment: dbComment._id } },
        { new: true }
      );
    })
    .then(dbArticle => {
      res.json(dbArticle);
    });
});

app.post("/comments/:id", (req, res) => {
  var id = req.params.id;
  db.comments.find({ _id: id }, function(err, data) {
    if (err) throw err;
    res.json(data);
  });
});

//app.listen always goes at the end of your code
app.listen(PORT, function() {
  console.log("App listening on PORT:" + PORT);
});
