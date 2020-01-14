const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const Admin = require('../models/Admin');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Admin.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // Options for the strategy
      callbackURL: '/admin/auth/google/redirect',
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshtoken, profile, done) => {
      // Passport callback function
      // Looking for the user in our DB
      Admin.findOne({ googleId: profile.id }).then(user => {
        if (user) {
          // Already have the user
          user.pic = profile._json.picture;
          console.log(
            'LOGGIN IN > ' + user.name
          );
          done(null, user);
        } else {
          // #TODO: Cambiare opzione dopo registrazione admin il 15/01
          // Otherwise create user in our DB - in DEV period only, in production redirecto to contacts or home
          const newAdmin = new Admin({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            pic: profile._json.picture,
            role: 0
          });
          newAdmin.save().then(data => {
            console.log('SIGNIN UP > ' + data);
            done(null, data);
          });
        }
      });
    }
  )
);

