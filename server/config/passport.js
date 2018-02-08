const path = require('path')
const LocalStrategy = require('passport-local').Strategy
const util = require(path.join(__dirname, '../util/auth.js'))

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    done(null, user)
  })

  passport.use('login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, username, password, done) {
    let sessionAPIUUID;
    util.callAuthAPI()
      .then(response => {
        sessionAPIUUID = response.data.sessionAPIUUID
        return util.callAuthUser(username, password, sessionAPIUUID)
      })
      .then(response => {
        const user = response.data
        done(null, Object.assign(user, {
          sessionAPIUUID: sessionAPIUUID
        }))
      })
      .catch(err => {
        done(null, false)
      })
  }))
}
