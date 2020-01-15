const mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  pic: String,
  role: Number,
  task: String,
  desc: String
  /* 
    ROLES:
      king   > 3 
      super  > 2
      admin  > 1
      user   > 0
  */
});

var Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
