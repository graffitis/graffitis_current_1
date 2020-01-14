const mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
  name: String,
  desc: String,
  status: Number
  /* authors: Array --> Coming Soon  */
});

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;
