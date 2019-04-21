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
      //console.log(response.data);
      var result = [{}];
      $("article").each((i, element) => {
        //var result = [];

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

        //console.log(result);
        result.push({
          title: result.title,
          summary: result.summary,
          url: result.url,
          image: result.image
        });
      });
      console.log(result);
      res.send("scrape complete");
    });
});

//app.listen always goes at the end of your code
app.listen(PORT, function() {
  console.log("App listening on PORT:" + PORT);
});
