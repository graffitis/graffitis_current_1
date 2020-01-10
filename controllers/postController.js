const mongoose = require('mongoose');
const Post = require('./../models/Post');

exports.checkID = (req, res, next) => {
  Post.find({ id: req.id }, (err, data) => {
    if (err) {
      res.status(404).json({
        status: 'fail',
        message: "Post doesn't exist | Invalid ID"
      });
    }
  });

  next();
};

exports.getAllPosts = (req, res) => {
  Post.find((err, data) => {
    if (err) {
      res.status(404).json({
        status: 'fail',
        message: 'No posts found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        posts: data
      }
    });
  });
};

exports.getPostByCategory = (req, res) => {
  Post.find({ category: req.params.category }, (err, data) => {
    if (err) {
      res.status(404).json({
        status: 'fail',
        message: 'No ${category} found'
      });
    }

    res
      .status(200)
      .render('show_category', { category: req.params.category, posts: data });
  });
};

exports.getPostById = (req, res) => {
  Post.findOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res
        .status(404)
        .render(
          '404'
        ) /* .json({
        status: 'fail',
        message: 'Post doesnt exist | Invalid ID'
      })*/;
    }

    res.status(200).render('show', { post: data });
  });
};

exports.createPost = (req, res) => {
  const newPost = new Post({
    cover: req.body.cover,
    title: req.body.title,
    category: req.body.category,
    author: req.body.author,
    body: req.body.body,
    edited: Date.now()
  });

  newPost.save(err => {
    if (err) {
      res.status(400).json({
        status: 'fail',
        message: 'Failed to create new post'
      });
    }
    res.status(201).json({
      status: 'success',
      data: {
        post: newPost
      }
    });
  });
};

exports.reset = (req, res) => {
  Post.deleteMany({ __v: 0 }, err => {
    if (err) {
      res.status(500).json({
        status: 'fail',
        message: 'Failed to reset posts collection'
      });
    }
    res.status(204).json({
      status: 'success',
      message: 'Post collection successfully resetted'
    });
  });
};