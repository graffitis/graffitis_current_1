const mongoose = require('mongoose');
const User = require('./../models/User');

exports.loginPage = (req, res) => {
  res.render('login_user');
};

exports.registerPage = (req, res) => {
  res.render('register_user');
};
