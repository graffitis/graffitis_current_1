const mongoose = require('mongoose');

const Log = require('./../models/Log');

function log(user, op) {
    Log.create({
        user: user,
        time: Date.now(),
        op: op
    }, err => {
        if (err) {
            console.log(err);
        }
    });
}

exports.authCheck = (req, res, next) => {
    // Basic Auth Check - All Users
    if (!req.user) {
        res.redirect('/admin/auth/register');
    } else {
        next();
    }
};

exports.kingCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/admin/auth/register');
    } else if (req.user.role != 3) {
        res.redirect('/upperRoleRequired');
    } else {
        next();
    }
}

exports.superCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/admin/auth/register');
    } else if (req.user.role < 2) {
        res.redirect('/upperRoleRequired');
    } else {
        next();
    }
}

exports.adminCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/admin/auth/register');
    } else if (req.user.role < 1) {
        res.redirect('/upperRoleRequired');
    } else {
        next();
    }
}

exports.userCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/admin/auth/register');
    } else {
        next();
    }
}

exports.newLog = (req, res, next) => {

    if (req.originalUrl.search('logout')) {
        log(req.user.name, -1);
    } else if (req.originalUrl.search('google')) {
        log(req.user.name, 1);
    } else if (req.originalUrl.search('new')) {
        log(req.user.name, 2);
    }

    next();

}