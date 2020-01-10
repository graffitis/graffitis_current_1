const express = require('express');
const userController = require('./../controllers/userController');
const router = express.Router();

router.route('/login').get(userController.loginPage);
router.route('/register').get(userController.registerPage);

module.exports = router;
