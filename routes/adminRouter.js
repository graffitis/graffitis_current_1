const express = require('express');
const adminController = require('./../controllers/adminController');
const router = express.Router();
const utils = require('./../config/utils');

// ROUTES
router.route('/dashboard').get(utils.adminCheck, adminController.dashboard);

router.route('/team').get(utils.adminCheck, adminController.teamPage);

module.exports = router;
