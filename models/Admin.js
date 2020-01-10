const mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  pic: String
});

var Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
