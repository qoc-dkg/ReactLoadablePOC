//load all the things we need
var LocalStrategy = require('passport-local').Strategy

//load up the user model
var User = require('../app/models/user')

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use('login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, username, password, done) {
    const query = {username};
    User.findOne(query, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.validPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    })
  }));

  passport.use('signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, username, password, done) {
    process.nextTick(function () {
      const query = {username}
      User.findOne(query, function (err, user) {
        if (err) {
          return done(err)
        }
        if (user) {
          return done(null, false)
        }
        const newUser = new User()
        newUser.username = username
        newUser.password = newUser.generateHash(password)
        newUser.save(function (err) {
          if (err) {
            throw err;
          }
          return done(null, newUser)
        })
      })
    })
  }))
}
