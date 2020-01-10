const express = require('express');
const userController = require('./../controllers/userController');
const router = express.Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/users/auth/login');
    } else {
        next();
    }
}

router.route('/dashboard').get(authCheck, userController.dashboard);
module.exports = router;
