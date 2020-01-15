const express = require('express');
const adminController = require('./../controllers/adminController');
const kingController = require('./../controllers/kingController');
const router = express.Router();
const utils = require('./../config/utils');

// ROUTES

router.route('/').get(utils.kingCheck, kingController.main);

router.route('/dashboard').get(utils.kingCheck, kingController.get_dashboard);

router.route('/logs').get(utils.kingCheck, kingController.get_logs);

//#TODO: Separare le route users in altro file
router.route('/users').get(utils.kingCheck, kingController.get_users);


//router.route('/users/:id').get(utils.kingCheck, kingController.get_users_edit).post(utils.kingCheck, kingController.edit_user).delete(utils.kingCheck, kingController.delete_user);

//#TODO: Separare le route prima in altro file
//router.route('/prima').get(utils.kingCheck, kingController.get_prima);

module.exports = router;