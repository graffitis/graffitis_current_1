const express = require('express');
const adminAuthController = require('./../controllers/adminAuthController');
const passport = require('passport');

const utils = require('./../config/utils');

const router = express.Router();


router.route('/login').get(adminAuthController.loginPage);
router.route('/logout').get(utils.newLog, adminAuthController.logout);
router.route('/register').get(adminAuthController.registerPage);
router.route('/google').get(
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);
// Callback route
router
  .route('/google/redirect')
  .get(passport.authenticate('google'), adminAuthController.callback);

module.exports = router;