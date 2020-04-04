const mongoose = require('mongoose');
const Post = require('./../models/Post');
const Category = require('./../models/Category');
const Admin = require('./../models/Admin');

exports.checkID = (req, res, next) => {
  Post.find({
    id: req.id
  }, (err, data) => {
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
  Post.find({
    status: 1
  }, (err, data) => {
    if (err) {
      res.status(404).json({
        status: 'fail',
        message: 'No posts found'
      });
    }

    data.sort((a, b) => {
      a = a.edited;
      b = b.edited;
      return a > b ? -1 : a < b ? 1 : 0;
    });

    res.locals.title = 'Tutti gli Articoli | ' + res.locals.title
    res.locals.desc = "Tutti gli articoli del nostro giornalino, in ordine cronologico di pubblicazione. Buona lettura! "
    res.render('show_all', {
      posts: data
    });
  });
};

exports.getPostByCategory = (req, res) => {
  const query = {
    $and: [{
      category: req.params.category
    }, {
      status: 1
    }]
  };
  Post.find(query, (err, data) => {
    if (err) {
      res.status(404).json({
        status: 'fail',
        message: 'No ${category} found'
      });
    }

    data.sort((a, b) => {
      a = a.edited;
      b = b.edited;
      return a > b ? -1 : a < b ? 1 : 0;
    });

    res.locals.title = (req.params.category.charAt(0).toUpperCase() + req.params.category.slice(1)) + ', Rubrica' + ' | ' + res.locals.title
    res.locals.desc = 'Tutti gli articoli della rubrica ' + (req.params.category.charAt(0).toUpperCase() + req.params.category.slice(1)) + '. Buona Lettura! Graffitis, il giornalino dell\'ITIS Delpozzo di Cuneo. Riflessioni, notizie, poesie, curiosità... e una giovane redazione.'
    res
      .status(200)
      .render('show_category', {
        category: req.params.category,
        posts: data
      });
  });
};

exports.getPostById = (req, res) => {
  Post.findOne({
    _id: req.params.id
  }, (err, data) => {
    if (err) {
      res
        .status(404)
        .render(
          '404'
        )
      /* .json({
             status: 'fail',
             message: 'Post doesnt exist | Invalid ID'
           })*/
      ;
    }

    Admin.find({
      name: data.author
    }, (err, authordata) => {
      if (err) {
        res.status(500).json({
          status: 'fail',
          message: 'error on post render'
        });
      }
      res.locals.title = data.title + ' | ' + res.locals.title
      res.locals.desc = data.title + ', di ' + data.author + res.locals.postSuffix
      if (authordata[0] != null) {
        if (authordata[0].desc != '' && authordata[0].desc) {

          res
            .status(200)
            .render('show', {
              post: data,
              Adesc: authordata[0].desc
            });
        }
      } else {
        res.status(200).render('show', {
          post: data,
          Adesc: -1,
          pageTitle: data.title,
          pageDesc: data.desc
        });
      }

    });
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

/* exports.reset = (req, res) => {
  Post.deleteMany({
    __v: 0
  }, err => {
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
}; */

exports.specialPage = (req, res) => {
  const query = {
    $and: [{
      special: true
    }, {
      status: 1
    }]
  };
  Post.find(query, (err, data) => {
    if (err) {
      res.status(500).json({
        status: 'fail',
        message: 'Failed to retrieve special posts'
      });
    }
    res.locals.title = 'Edizioni Speciali' + ' | ' + res.locals.title
    res.locals.desc = 'Tutte le edizioni speciali del nostro giornalino. Articoli scritti in occasione di eventi e avvenimenti particolari. '
    res.render('show_category', {
      category: 'speciali',
      posts: data
    });
  });
};

exports.get_cats = (req, res) => {
  Category.find((err, data) => {
    if (err) {
      res.status(500).json({
        status: 'fail',
        message: 'failed to retrieve categories from DB'
      });
    } else {
      res.locals.title = 'Le Rubriche' + ' | ' + res.locals.title
      res.locals.desc = 'Le nostre rubriche, scritte da una redazione giovane che si cimenta ogni giorno nel redigere contenuti interessanti e di qualità. '
      res.render('categories', {
        cats: data
      });
    }
  });
};