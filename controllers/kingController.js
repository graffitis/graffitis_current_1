const mongoose = require('mongoose');
const Admin = require('./../models/Admin');
const Post = require('./../models/Post');
const Category = require('./../models/Category');
const Log = require('./../models/Log');

exports.main = (req, res) => {
  res.render('choice_king');
};

exports.get_dashboard = (req, res) => {
  res.render('dashboard_king');
};

exports.get_posts = (req, res) => {
  Post.find((err, data) => {
    if (err) {
      res.status(400).json({
        status: 'fail',
        message: 'failed to load posts',
      });
    }

    data.sort((a, b) => b.edited - a.edited);
    res.render('dashboard_king_posts', {
      posts: data,
      user: req.user,
    });
  });
};

exports.get_new_post = (req, res) => {
  Category.find((err, data) => {
    if (err) {
      res.status(500).json({
        status: 'failed',
        message: 'failed to retrieve categories',
      });
    }
    res.render('dashboard_king_create_post', {
      cats: data,
    });
  });
};

exports.createPage = (req, res) => {
  Category.find((err, data) => {
    if (err) {
      res.status(500).json({
        status: 'failed',
        message: 'failed to retrieve categories',
      });
    }
    res.render('dashboard_create', {
      cats: data,
    });
  });
};

exports.new_post = (req, res) => {
  const special = req.body.special === 'true';

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
    req.flash('success', 'Nuovo articolo creato correttamente!');
    res.redirect('/king/posts');
  });
};

exports.get_approve = (req, res) => {
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
          message: 'failed to retrieve posts',
        });
      }
      const originalAuthor = {
        name: data.author,
        pic: data.authorPic,
      };
      res.render('dashboard_king_posts_approve', {
        post: data,
        user: req.user,
        cats: cats,
        originalAuthor: originalAuthor,
      });
    });
  });
};

exports.approve = (req, res) => {
  const special = req.body.special === 'true';
  console.log('HAI SALVATO QUALCOSA, SPECIAL --> ' + special);

  let updatedPost = {
    cover: req.body.cover,
    title: req.body.title,
    desc: req.body.desc,
    category: req.body.category.toLowerCase().replace(/\s+/g, '-'),
    author: req.body.author,
    authorPic: req.body.authorPic,
    status: req.body.status * 1,
    edited: Date.now(),
    body: req.body.body,
    tags: req.body.tags.replace(/\s+/g, '').split(','),
    special: special,
  };

  if (req.body.redazione) {
    console.log('REDAZIONE --> true');

    if (
      req.body.author.charAt(req.body.author.length - 1) != 'r' &&
      req.body.author.charAt(req.body.author.length - 2) != '_' &&
      req.body.author.charAt(req.body.author.length - 3) != '_'
    ) {
      updatedPost.author = updatedPost.author + '__r';
    }
  } else if (
    req.body.author.charAt(req.body.author.length - 1) === 'r' &&
    req.body.author.charAt(req.body.author.length - 2) === '_' &&
    req.body.author.charAt(req.body.author.length - 3) === '_'
  ) {
    console.log('devo rimuovere il suffisso');

    const regex = /__r/gi;
    updatedPost.author = updatedPost.author.replace(regex, '');

    updatedPost.author.trim();
  }

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
      res.redirect('/king/posts');
    });
  });
};

exports.delete_post = (req, res) => {
  Post.deleteOne(
    {
      _id: req.params.id,
    },
    (err) => {
      if (err) {
        res.status(500).json({
          status: 'fail',
          message: 'Failed to delete post',
        });
      }
      req.flash('success', 'Post eliminato con successo!');
      res.redirect('/king/posts');
    }
  );
};

exports.get_users = (req, res) => {
  Admin.find((err, data) => {
    if (err) {
      res.status(500).json({
        status: 'fail',
        message: 'failed to retrieve posts from DB',
      });
    }

    res.render('dashboard_king_users', {
      users: data,
    });
  });
};

exports.get_logs = (req, res) => {
  Log.find((err, data) => {
    if (err) {
      res.status(500).json({
        status: 'fail',
        message: 'failed to retrieve logs from DB',
      });
    }

    data.sort((a, b) => b.time - a.time);

    res.render('dashboard_king_logs', {
      logs: data,
    });
  });
};
