const express = require('express');
const mongoose = require('mongoose');
const Category = require('./../models/Category');
const basicController = require('./../controllers/basicController');
const router = express.Router();

router.route('/').get(basicController.getHome);

router.route('/choice').get((req, res) => {
  res.render('choice');
});

router.route('/testpage').get((req, res) => {
  res.render('test');
});

router.route('/paginanuova').get((req, res) => {
  res.render('test2');
});

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
