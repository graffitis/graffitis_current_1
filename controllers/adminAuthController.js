const mongoose = require('mongoose');
const Admin = require('./../models/Admin');

exports.loginPage = (req, res) => {
  res.render('login_admin');
};

exports.registerPage = (req, res) => {
  res.render('register_admin');
};

exports.login_google = (req, res) => {
  // HANDLE WITH PASSPORT
  res.send('Loggin in with Google');
};

exports.logout = (req, res) => {
  // HANDLE WITH PASSPORT
  req.logout();
  req.flash('success', 'Hai eseguito correttamente il logout');
  res.redirect('/admin/auth/login');
};

exports.callback = (req, res) => {
  req.flash(
    'success',
    'Hai eseguito il login corettamente come ' + req.user.name
  );
  if (req.user.role === 2) {
    res.redirect('/super');
  } else if (req.user.role === 1) {
    res.redirect('/admin/dashboard');
  } else {
    res.redirect('/');
  }
};
