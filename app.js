const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const postRouter = require('./routes/postRouter');
const basicRouter = require('./routes/basicRouter');
const adminAuthRouter = require('./routes/adminAuthRouter');
const adminPostRouter = require('./routes/adminPostsRouter');

const passportSetup = require('./config/passport-setup');
const passport = require('passport');
const keys = require('./config/keys');

const app = express();

// Definiamo il motore che utilizzeremo per i template
app.set('view engine', 'ejs');

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
  next();
});

/* app.route('/edit/:id').get((req, res) => {
  console.log(req.params.id);
  res.render('dashboard_edit');
}); */

app.use('/users', userRouter);
app.use('/admin', adminRouter);
app.use('/admin/posts', adminPostRouter);
app.use('/admin/auth', adminAuthRouter);
app.use('/posts', postRouter);
app.use('/', basicRouter);

module.exports = app;