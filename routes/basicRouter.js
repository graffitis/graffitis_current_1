const express = require('express');
const mongoose = require('mongoose');
const Category = require('./../models/Category');
const basicController = require('./../controllers/basicController');
const userController = require('./../controllers/userController');
const utils = require('./../config/utils');
const router = express.Router();


router.route('/').get(basicController.getHome);

router.route('/choice').get((req, res) => {
  res.redirect('/admin/auth/register');
});

router.route('/errpage').get((req, res) => {
  // await new Promise(resolve => setTimeout(resolve, 36000));
  res.status(500).render('errpage');
});

router.route('/dashboard').get(utils.userCheck, userController.dashboard);

router.route('/redazione').get(basicController.get_redazione);

router.route('/upperRoleRequired').get(basicController.get_upperRole);

router.route('/*').get(basicController.pageNotFound);

module.exports = router;