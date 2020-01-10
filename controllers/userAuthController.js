const mongoose = require("mongoose");
const User = require("./../models/User");

exports.loginPage = (req, res) => {
  res.render("login_user");
};

exports.registerPage = (req, res) => {
  res.render("register_user");
};

exports.login_google = (req, res) => {
  // HANDLE WITH PASSPORT
  res.send("Loggin in with Google");
};

exports.logout = (req, res) => {
  // HANDLE WITH PASSPORT
  req.logout();
  req.flash("success", "Hai eseguito correttamente il logout");
  res.redirect("/users/auth/login");
};

exports.callback = (req, res) => {
  req.flash(
    "success",
    "Hai eseguito il login corettamente come " + req.user.name
  );
  res.redirect("/users/dashboard");
};
