const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  cover: String,
  title: String,
  desc: String,
  category: String,
  author: String,
  authorPic: String,
  status: Number,
  body: String,
  edited: Date,
  tags: Array,
  special: Boolean,
  featured: Boolean
  //#TODO: Implementare vettore modifiche in modello, controller e view
  //#TODO: Implementare vettore autori e realtive sub-features | Graffitis Collab
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
