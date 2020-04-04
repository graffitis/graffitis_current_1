exports.dashboard = (req, res) => {
  res.locals.title = 'Dashboard, User' + ' | ' + res.locals.title

  res.render('dashboard_user');
};