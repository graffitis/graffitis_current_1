const express = require('express');
const adminController = require('./../controllers/adminController');
const router = express.Router();
const utils = require('./../config/utils');




router.route('/').get(utils.adminCheck, adminController.posts);

router
  .route('/new')
  .get(utils.adminCheck, adminController.createPage)
  .post(utils.adminCheck, adminController.newPost);

router
  .route('/:id')
  .get(utils.adminCheck, adminController.editPage)
  .post(utils.adminCheck, adminController.editPost)
  .delete(utils.adminCheck, adminController.deletePost);

module.exports = router;
