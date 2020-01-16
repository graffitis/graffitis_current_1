const mongoose = require('mongoose');

const Admin = require('./../models/Admin');

exports.get = (req, res) => {
    res.render('profile');
}

exports.create = (req, res) => {
    let upUser = {
        googleId: req.user.googleId,
        name: req.body.name,
        email: req.body.email,
        pic: req.user.pic,
        role: req.user.role,
        task: req.body.task,
        desc: req.body.desc
    }

    Admin.findById(req.user._id, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 'fail',
                message: 'failed to retrieve user from DB'
            });
        } else {
            data.replaceOne(upUser, (err, data) => {
                if (err) {
                    res.status(500).json({
                        status: 'fail',
                        message: 'failed to update user profile'
                    });
                } else {
                    req.flash('success', 'Profilo aggiornato con successo!');
                    res.redirect('/');
                }
            })
        }
    })
}