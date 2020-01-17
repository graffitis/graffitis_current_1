const express = require('express');
const adminController = require('./../controllers/adminController');
const superController = require('./../controllers/superController');
const router = express.Router();
const utils = require('./../config/utils');

// ROUTES

router.route('/').get(utils.superCheck, superController.main);

router.route('/dashboard').get(utils.superCheck, superController.get_dashboard);


//#TODO: Separare le route users in altro file
router.route('/users').get(utils.superCheck, superController.get_users);

router.route('/users/:id').get(utils.superCheck, superController.get_users_edit).post(utils.superCheck, superController.edit_user).delete(utils.superCheck, superController.delete_user);

//#TODO: Separare le route prima in altro file
router.route('/prima').get(utils.superCheck, superController.get_prima).post(utils.superCheck, superController.update_prima);




module.exports = router;