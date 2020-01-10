const express = require('express');
const adminController = require('./../controllers/adminController');
const router = express.Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect('/admin/auth/register');
  } else {
    next();
  }
};

router.route('/').get(authCheck, adminController.posts);

router
  .route('/new')
  .get(authCheck, adminController.createPage)
  .post(authCheck, adminController.newPost);

router
  .route('/:id')
  .get(authCheck, adminController.editPage)
  .post(authCheck, adminController.editPost)
  .delete(authCheck, adminController.deletePost);

module.exports = router;
