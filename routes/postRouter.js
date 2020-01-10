const express = require('express');
const postController = require('./../controllers/postController');
const router = express.Router();

router
  .route('/')
  .get(postController.getAllPosts)
  .post(postController.createPost);

router.route('/reset').delete(postController.reset);

router.route('/:id').get(postController.getPostById);

// TODO: Implementare vettore categorie
// router.route('/categories').get(postController.getAllCategories);

router.route('/categories/:category').get(postController.getPostByCategory);

module.exports = router;
