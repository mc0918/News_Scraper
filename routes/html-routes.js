var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/", function(req, res) {
  db.Article.find({}, function(err, data) {
    console.log(data);
    res.render("index", { articles: data });
  });
});

module.exports = router;
