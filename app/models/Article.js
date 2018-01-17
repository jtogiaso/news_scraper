const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: String,
  summary: String,
  link: {type: String , unique: true},
  comments: Array
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
