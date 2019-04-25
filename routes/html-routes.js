var express = require("express");
var router = express.Router();
var db = require("../models");

//Serves the home page and stores the articles and comments collections as objects passed to handlebars
router.get("/", function(req, res) {
  db.Article.find({}, function(err, data) {
    console.log(data);
  }).then(function(data) {
    db.Comment.find({}, function(err, response) {
      console.log("COMMENT RESPONSE: ", response);
      res.render("index", { collection: { data, response } });
    });
  });
});

module.exports = router;
