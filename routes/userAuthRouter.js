const router = require('express').Router()
const userAuthController = require('./../controllers/userAuthController');
const passport = require('passport');

router.route('/login').get(userAuthController.loginPage);
router.route('/logout').get(userAuthController.logout);
router.route('/register').get(userAuthController.registerPage);
router.route('/google').get(
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// Callback route
router
  .route('/google/redirect')
  .get(passport.authenticate('google'), userAuthController.callback);

  module.exports = router;
