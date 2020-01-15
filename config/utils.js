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



