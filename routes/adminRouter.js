const express = require('express');
const adminController = require('./../controllers/adminController');
const router = express.Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect('/admin/auth/register');
  } else {
    next();
  }
};

// ROUTES
router.route('/dashboard').get(authCheck, adminController.dashboard);

module.exports = router;
