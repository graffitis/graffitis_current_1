const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const postmark = require('postmark');
const Admin = require('./../models/Admin');
const Post = require('./../models/Post');
const Log = require('./../models/Log');
const Category = require('./../models/Category');
const utils = require('./../config/utils');

exports.dashboard = (req, res) => {
  // Retrieving user data
  res.locals.title = 'Dashboard, Admin |' + res.locals.title
  res.render('dashboard_admin', {
    user: req.user,
  });
};

exports.posts = (req, res) => {
  Post.find((err, data) => {
    if (err) {
      res.status(400).json({
        status: 'fail',
        message: 'failed to load posts',
      });
    }
    data.sort((a, b) => b.edited - a.edited);
    res.locals.title = 'Articoli, Admin | ' + res.locals.title
    res.render('dashboard_posts', {
      posts: data,
      user: req.user,
    });
  });
};

exports.editPage = (req, res) => {
  Post.findById(req.params.id, (err1, data) => {
    Category.find((err2, cats) => {
      if (err2) {
        res.status(500).json({
          status: 'failed',
          message: 'failed to retrieve categories',
        });
      }
      if (err1) {
        res.status(400).json({
          status: 'fail',
          message: 'failed to load posts',
        });
      }
      res.locals.title = 'Modifica: ' + data.title + ' | ' + res.locals.title
      res.render('dashboard_edit', {
        post: data,
        user: req.user,
        cats: cats,
      });
    });
  });
};

exports.editPost = (req, res) => {
  const special = req.body.special === 'true';

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
    tags: req.body.tags.replace(/\s+/g, '').split(','),
    spcial: special,
  };

  Post.findById(req.params.id, (err, data) => {
    let dateState = 'Data aggiornata';
    if (err) {
      return res.status(404).json({
        status: 'fail',
        message: "Post to be modified doesn't exist | Invalid ID",
      });
    }
    console.log('updateFlag --> ' + req.body.updateFlag);
    // Controlliamo il flag per sapere se aggiornare o meno la data di modifica
    if (req.body.updateFlag * 1 === -1) {
      updatedPost.edited = data.edited;
      dateState = 'Data non aggiornata';
    }

    data.replaceOne(updatedPost, (err) => {
      if (err) {
        return res.status(500).json({
          status: 'fail',
          message: 'Failed to update new post',
        });
      }
      req.flash('success', 'Post Modificato con successo! | ' + dateState);
      res.redirect('/admin/posts');
    });
  });
  Log.create({
      user: req.user.name,
      time: Date.now(),
      op: 3,
    },
    (err, data) => {
      if (err) {
        res.status(500).json({
          status: 'fail',
          message: 'the post has been edited, but the server failed to save log documents',
        });
      }
    }
  );
};

exports.createPage = (req, res) => {
  Category.find((err, data) => {
    if (err) {
      res.status(500).json({
        status: 'failed',
        message: 'failed to retrieve categories',
      });
    }
    res.locals.title = 'Nuovo Articolo, Admin | ' + res.locals.title
    res.cookie('imgKey', null).render('dashboard_create', {
      cats: data,
    });
  });
};

exports.newPost = (req, res) => {
  const special = req.body.special === 'true';

  if (req.body.status * 1 === 1) {
    res.status(403).json({
      staus: 'forbidden',
      message: 'upper role required to get posts online',
    });
  }

  const newPost = new Post({
    cover: req.body.cover,
    title: req.body.title,
    desc: req.body.desc,
    category: req.body.category.toLowerCase().replace(/\s+/g, '-'),
    author: req.user.name,
    authorPic: req.user.pic,
    body: req.body.body,
    tags: req.body.tags.replace(/\s+/g, '').split(''),
    status: req.body.status * 1,
    edited: Date.now(),
    special: special,
  });

  newPost.save((err) => {
    if (err) {
      res.status(400).json({
        status: 'fail',
        message: 'Failed to create new post',
      });
    }

    Log.create({
        user: req.user.name,
        time: Date.now(),
        op: 2,
      },
      (err, data) => {
        if (err) {
          res.status(500).json({
            status: 'fail',
            message: 'the post has been created, but the server failed to save log documents',
          });
        }
      }
    );

    utils.mail_creato(req.user, newPost);

    req.flash('success', 'Nuovo articolo creato correttamente!');
    res.redirect('/admin/posts');
  });
};

exports.deletePost = (req, res) => {
  Post.deleteOne({
      _id: req.params.id,
    },
    (err) => {
      if (err) {
        res.status(500).json({
          status: 'fail',
          message: 'Failed to delete post',
        });
      }
      res.redirect('/admin/posts');
    }
  );

  Log.create({
      user: req.user.name,
      time: Date.now(),
      op: 4,
    },
    (err, data) => {
      if (err) {
        res.status(500).json({
          status: 'fail',
          message: 'the post has been deleted, but the server failed to save log documents',
        });
      }
    }
  );
};

exports.teamPage = (req, res) => {
  console.log('got here');
  Admin.find((err, data) => {
    if (err) {
      res.status(500).json({
        status: 'fail',
        message: 'failed to retrieve admins',
      });
    }
    console.log('got here c2');
    res.locals.title = 'Redazione, Admin | ' + res.locals.title
    res.render('dashboard_team', {
      admins: data,
    });
  });
};