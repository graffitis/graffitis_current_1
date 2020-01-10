const mongoose = require('mongoose');
const Admin = require('./../models/Admin');
const Post = require('./../models/Post');
const Category = require('./../models/Category');

exports.dashboard = (req, res) => {
  // Retrieving user data
  res.render('dashboard_admin', { user: req.user });
};

exports.posts = (req, res) => {
  Post.find((err, data) => {
    if (err) {
      res.status(400).json({
        status: 'fail',
        message: 'failed to load posts'
      });
    }
    res.render('dashboard_posts', { posts: data, user: req.user });
  });
};

exports.editPage = (req, res) => {
  Post.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(400).json({
        status: 'fail',
        message: 'failed to load posts'
      });
    }

    res.render('dashboard_edit', { post: data, user: req.user });
  });
};

exports.editPost = (req, res) => {
  let updatedPost = {
    cover: req.body.cover,
    title: req.body.title,
    desc: req.body.desc,
    category: req.body.category.toLowerCase().replace(/\s+/g, '-'),
    author: req.user.name,
    authorPic: req.user.pic,
    status: req.body.status * 1,
    edited: Date.now(),
    body: req.body.body,
    tags: req.body.tags.replace(/\s+/g, '').split(',')
  };

  Post.findById(req.params.id, (err, data) => {
    let dateState = 'Data aggiornata';
    if (err) {
      return res.status(404).json({
        status: 'fail',
        message: "Post to be modified doesn't exist | Invalid ID"
      });
    }
    console.log('updateFlag --> ' + req.body.updateFlag);
    // Controlliamo il flag per sapere se aggiornare o meno la data di modifica
    if (req.body.updateFlag * 1 === -1) {
      updatedPost.edited = data.edited;
      dateState = 'Data non aggiornata';
    }

    data.replaceOne(updatedPost, err => {
      if (err) {
        return res.status(500).json({
          status: 'fail',
          message: 'Failed to update new post'
        });
      }
      req.flash('success', 'Post Modificato con successo! | ' + dateState);
      res.redirect('/admin/dashboard');
    });
  });
};

exports.createPage = (req, res) => {
  Category.find((err, data) => {
    if (err) {
      res.status(500).json({
        status: 'failed',
        message: 'failed to retrieve categories'
      });
    }
    res.render('dashboard_create', { cats: data });
  });
};

exports.newPost = (req, res) => {

  console.log(req.body)

  const newPost = new Post({
    cover: req.body.cover,
    title: req.body.title,
    desc: req.body.desc,
    category: req.body.category.toLowerCase().replace(/\s+/g, '-'),
    author: req.user.name,
    authorPic: req.user.pic,
    body: req.body.body,
    tags: req.body.tags.replace(/\s+/g, '').split(','),
    status: req.body.status * 1,
    edited: Date.now()
  });

  newPost.save(err => {
    if (err) {
      res.status(400).json({
        status: 'fail',
        message: 'Failed to create new post'
      });
    }
    req.flash('success', 'Nuovo articolo creato correttamente!');
    res.redirect('/admin/dashboard');
  });
};

exports.deletePost = (req, res) => {
  Post.deleteOne({ _id: req.params.id }, err => {
    if (err) {
      res.status(500).json({
        status: 'fail',
        message: 'Failed to delete post'
      });
    }
    res.redirect('/admin/posts');
  });
};
