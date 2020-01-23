const mongoose = require('mongoose');
const Admin = require('./../models/Admin');
const Log = require('./../models/Log');
const utils = require('./../config/utils');

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
  req.flash('success', 'Hai eseguito correttamente il logout');
  res.redirect('/admin/auth/login');
}



exports.callback = (req, res) => {
  Log.create({
    user: req.user.name,
    time: Date.now(),
    op: 1
  }, (err, data) => {
    if (err) {
      res.status(500).json({
        status: 'fail',
        message: 'failed to save log trace'
      });
    }
    req.flash(
      'success',
      'Hai eseguito il login correttamente come ' + req.user.name
    );
    if (req.user.role === 3) {
      res.redirect('/king');
    } else if (req.user.role === 2) {
      res.redirect('/super');
    } else if (req.user.role === 1) {
      res.redirect('/admin/dashboard');
    } else {
      res.redirect('/');
    }
  });

};