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

router.route('/dashboard').get(utils.userCheck, userController.dashboard);

router.route('/redazione').get(basicController.get_redazione);

router.route('/upperRoleRequired').get(basicController.get_upperRole);

router.route('/newcat').get((req, res) => {
  const newCat = {
    name: 'Musica',
    authors: ['Sofia', 'Tolo', 'Veronica', 'Giosuè']
  };
  Category.create(newCat, (err, data) => {
    if (err) {
      res.status(500).json({
        status: 'failed',
        message: 'failed to create new category'
      });
    }
    res.status(201).json({
      status: 'success',
      content: data
    });
  });
});

router.route('/*').get(basicController.pageNotFound);

module.exports = router;
