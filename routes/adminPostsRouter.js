const express = require('express');
const adminController = require('./../controllers/adminController');
const router = express.Router();
const utils = require('./../config/utils');




router.route('/').get(utils.authCheck, adminController.posts);

router
  .route('/new')
  .get(utils.authCheck, adminController.createPage)
  .post(utils.authCheck, adminController.newPost);

router
  .route('/:id')
  .get(utils.authCheck, adminController.editPage)
  .post(utils.authCheck, adminController.editPost)
  .delete(utils.authCheck, adminController.deletePost);

module.exports = router;
