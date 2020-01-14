const mongoose = require('mongoose');
const Category = require('./../models/Category');
const User = require('./../models/User');
const Admin = require('./../models/Admin');
const Post = require('./../models/Post');



//#TODO: Separare i controller del SuperUser

exports.get_dashboard = (req, res) => {
    function getCats() {
        Category.find((err, data) => {
            return cats = data;
        });

    }

    function getUsers() {
        User.find((err, data) => {
            return users = data;
        });
    }

    res.render('dashboard_super', { cats: getCats(), users: getUsers() });
}

exports.main = (req, res) => {
    res.render('choice_super');
}

exports.get_users = (req, res) => {
    //#TODO: Eliminare gli users 0 dalla query
    Admin.find((err, data) => {
        if (err) {
            res.status(500).json({
                status: 'fail',
                message: 'Failed to retrieve users'
            })
        }
        res.render('dashboard_super_users', { user: req.user, users: data });
    })
}

exports.get_users_edit = (req, res) => {
    Admin.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 'fail',
                message: 'failed to load user data'
            })
        }
        res.render('dashboard_super_edit', { formUser: data });
    })
}

//#TODO: googleId non aggiornato, CORREGGERE. User su standard dopo edit
exports.edit_user = (req, res) => {
    Admin.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 'fail',
                message: 'failed to retrieve user to update'
            })
        } else {
            let upUser = {
                googleID: data.googleId,
                name: req.body.name,
                email: req.body.email,
                pic: data.pic,
                role: req.body.role * 1
            }
            data.replaceOne(upUser, err => {
                if (err) {
                    res.status(500).json({
                        status: 'fail',
                        message: 'failed to update user'
                    })
                } else {
                    req.flash('success', 'Utente modificato con successo');
                    res.redirect('/super/dashboard');
                }
            })
        }
    })
}


exports.delete_user = (req, res) => {
    Admin.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 'fail',
                message: 'failed to delete user'
            })
        }
        req.flash('success', 'Utente eliminato correttamente');
        res.status(204).redirect('/super/dashboard');
    })
}

exports.get_cats = (req, res) => {
    Category.find((err, data) => {
        if (err) {
            res.status(500).json({
                status: 'fail',
                message: 'failed to retrieve categories from DB'
            })
        }
        res.render('dashboard_super_cats', { cats: data });
    })
}

exports.get_new_cat = (req, res) => {
    res.render('dashboard_super_create_cat');
}

exports.new_cat = (req, res) => {
    newCat = {
        name: req.body.name,
        desc: req.body.desc,
        status: req.body.status * 1
    }

    Category.create(newCat, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 'fail',
                message: 'failed to creatre new category'
            })
        } else {

            req.flash('success', 'Nuova categoria creata con successo');
            res.redirect('/super/cats');
        }
    })
}

exports.get_edit_cat = (req, res) => {
    Category.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 'fail',
                message: 'failed to retrieve category from DB'
            })
        }
        res.render('dashboard_super_edit_cat', { cat: data });
    })
}

exports.edit_cat = (req, res) => {
    upCat = {
        name: req.body.name,
        desc: req.body.desc,
        status: req.body.status * 1
    }

    Category.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 'fail',
                message: 'failed to retrieve category from DB'
            })
        }
        data.replaceOne(upCat, (err, data) => {
            if (err) {
                res.status(500).json({
                    status: 'fail',
                    message: 'failed to update category'
                })
            }
            req.flash('success', 'Categoria modificata con successo');
        })
    })
}

exports.delete_cat = (req, res) => {
    Category.deleteOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 'fail',
                message: 'failed to delete category'
            })
        }
        req.flash('success', 'Categoria eliminata con successo');
        res.redirect('/super/cats');
    })
}

exports.get_prima = (req, res) => {
    Post.find((err, data) => {
        if (err) {
            res.status(500).json({
                status: 'fail',
                message: 'failed to retrieve posts from DB'
            })
        }
        res.render('dashboard_super_prima', { posts: data });
    });
}
