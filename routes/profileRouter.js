const express = require('express');

const profileController = require('./../controllers/profileController');

const router = express.Router();

const utils = require('./../config/utils');



router.route('/').get(utils.adminCheck, profileController.get).post(utils.adminCheck, profileController.create);

module.exports = router;