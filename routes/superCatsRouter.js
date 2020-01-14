const express = require('express');
const adminController = require('./../controllers/adminController');
const superController = require('./../controllers/superController');
const router = express.Router();
const utils = require('./../config/utils');

// ROUTES

router.route('/').get(utils.superCheck, superController.get_cats)
router.route('/new').get(utils.superCheck, superController.get_new_cat).post(utils.superCheck, superController.new_cat);
router.route('/:id').get(utils.superCheck, superController.get_edit_cat).post(utils.superCheck, superController.edit_cat).delete(utils.superCheck, superController.delete_cat);

module.exports = router;