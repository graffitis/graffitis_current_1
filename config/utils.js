const mongoose = require('mongoose');
const postmark = require('postmark');
const keys = require('./../config/keys');
const client = new postmark.ServerClient(keys.mail.postmarkAPI);
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

exports.mail_creato = (user, body) => {

    let userName = user.name.split(' ');

    client.sendEmailWithTemplate({
        From: 'graffitis_mailer1@revo.digital',
        To: user.email,
        TemplateAlias: 'articoloCreato',
        TemplateModel: {
            name: userName[0],
            action_url: 'https://graffitis.itiscuneo.gov.it/admin/dashboard',
            title: body.title,
            desc: body.desc,
            img: body.cover
        }
    });
}

exports.mail_pronto = (user, body) => {
    client.sendEmailWithTemplate({
        From: 'graffitis_mailer1@revo.digital',
        To: user.email,
        TemplateAlias: 'articoloCreato',
        TemplateModel: {
            name: userName[0],
            action_url: 'https://graffitis.itiscuneo.gov.it/admin/dashboard',
            title: body.title,
            desc: body.desc,
            img: body.cover
        }
    });
}