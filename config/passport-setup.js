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
      Admin.findOne({ googleId: profile.id }).then(currentAdmin => {
        if (currentAdmin) {
          // Already have the user
          currentAdmin.pic = profile._json.picture;
          console.log(
            'Loggin in previously existent user ' + currentAdmin.name
          );
          done(null, currentAdmin);
        } else {
          // Otherwise create user in our DB
          const newAdmin = new Admin({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            pic: profile._json.picture
          });
          newAdmin.save().then(data => {
            console.log('New User Created ' + data);
            done(null, data);
          });
        }
      });
    }
  )
);
