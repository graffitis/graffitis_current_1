const mongoose = require('mongoose');

var logSchema = new mongoose.Schema({
  user: String,
  time: Date,
  op: Number
});

var Log = mongoose.model('Log', logSchema);

module.exports = Log;
