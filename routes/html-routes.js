var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/", function(req, res) {
  db.Article.find({}, function(err, data) {
    console.log(data);
    //res.render("index", { articles: data });
  }).then(function(data) {
    db.Comment.find({}, function(err, response) {
      console.log("COMMENT RESPONSE: ", response);
      res.render("index", { collection: { data, response } });
    });
  });
});

// function getComment() {
//   db.Comment.find({}, function(err, response) {});
// }

module.exports = router;
