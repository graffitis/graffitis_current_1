const mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
  name: String,
  authors: Array
});

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;
