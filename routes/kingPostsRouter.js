const express = require('express');
const adminController = require('../controllers/adminController');
const kingController = require('../controllers/kingController');
const router = express.Router();
const utils = require('../config/utils');

// ROUTES

router.route('/').get(utils.kingCheck, kingController.get_posts)
router.route('/new').get(utils.kingCheck, kingController.get_new_post).post(utils.kingCheck, kingController.new_post);
router.route('/:id').get(utils.kingCheck, kingController.get_approve).post(utils.kingCheck, kingController.approve).delete(utils.kingCheck, kingController.delete_post);

module.exports = router;