const mongoose = require('mongoose');
const Post = require('./../models/Post');

exports.getHome = (req, res) => {
  Post.find({ status: 1 }, (err, data) => {
    if (err) {
      res.status(404).render('404');
    }

    data.sort((a, b) => {
      a = a.edited;
      b = b.edited;
      return a > b ? -1 : a < b ? 1 : 0;
    });

    res.status(200).render('home', { posts: data });
  });
};

exports.pageNotFound = (req, res) => {
  res.status(400).render('404', { url: req.originalUrl });
};
