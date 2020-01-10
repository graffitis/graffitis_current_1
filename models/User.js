const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  cover: String,
  title: String,
  category: String,
  author: String,
  body: String,
  edited: Date
});

var User = mongoose.model('User', userSchema);

module.exports = User;
