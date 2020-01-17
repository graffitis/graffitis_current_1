const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const favicon = require('serve-favicon')

const postRouter = require('./routes/postRouter');
const basicRouter = require('./routes/basicRouter');
const userRouter = require('./routes/userRouter');
const userAuthRouter = require('./routes/userAuthRouter');
const adminRouter = require('./routes/adminRouter');
const adminAuthRouter = require('./routes/adminAuthRouter');
const adminPostRouter = require('./routes/adminPostsRouter');
const superRouter = require('./routes/superRouter');
const superCatsRouter = require('./routes/superCatsRouter');
const kingRouter = require('./routes/kingRouter');
const kingPostsRouter = require('./routes/kingPostsRouter');
const profileRouter = require('./routes/profileRouter');

const passportSetup = require('./config/passport-setup');
const passport = require('passport');
const keys = require('./config/keys');

const Category = require('./models/Category');

const app = express();



// Definiamo il motore che utilizzeremo per i template
app.set('view engine', 'ejs');

const path = require('path')
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// Definiamo la cartella dei contenuti statici
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(express.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(
  methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// Messaggistica a schermo -  Setup Sessione
/* app.use(
  session({
    secret: keys.expressMessages,
    resave: false,
    saveUnitialized: false,
    cookie: { secure: true }
  })
); */

app.use(require('connect-flash')());
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

/* app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
); */

// Settaggio chiave e durata log-in in millis
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

// Inizializzazione Passport
app.use(passport.initialize());
app.use(passport.session());

// Salvataggio Variabili Globali
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.prima = [];
  next();
});

app.use((req, res, next) => {
  Category.find((err, data) => {
    if (err) {
      res.status(500).json({
        status: 'fail',
        message: 'failed to retrieve headers categories from header'
      })
    }
    res.locals.headerCats = data;
  });
  next();
})

/* app.route('/edit/:id').get((req, res) => {
  console.log(req.params.id);
  res.render('dashboard_edit');
}); */

app.use('/profile', profileRouter);
app.use('/users', userRouter);
app.use('/users/auth', userAuthRouter);
app.use('/admin', adminRouter);
app.use('/admin/posts', adminPostRouter);
app.use('/admin/auth', adminAuthRouter);
app.use('/super/cats', superCatsRouter)
app.use('/super', superRouter);
app.use('/king/posts', kingPostsRouter);
app.use('/king', kingRouter);
app.use('/posts', postRouter);
app.use('/', basicRouter);

module.exports = app;
