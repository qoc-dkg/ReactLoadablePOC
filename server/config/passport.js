var LocalStrategy = require('passport-local').Strategy

//load mongo user model
//var User = require('../app/models/user')

const patient = {
  username: 'patient',
  password: '1111'
}

module.exports = function (passport) {

  passport.serializeUser(function (user, done) {
    done(null, patient)
  })

  passport.deserializeUser(function (id, done) {
    done(null, patient)
  })

  passport.use('login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, username, password, done) {
    const rightCredentials = username === patient.username &&
      password === patient.password
    if (rightCredentials) {
      return done(null, patient)
    } else {
      return done(null, false)
    }
    /*const query = {username};
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
    })*/
  }))
}
