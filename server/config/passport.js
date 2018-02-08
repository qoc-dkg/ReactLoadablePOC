const axios = require('axios')
const path = require('path')
const LocalStrategy = require('passport-local').Strategy
const constants = require(path.join(__dirname, './constants.js'))

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
    callAuthAPI()
      .then(response => {
        sessionAPIUUID = response.data.sessionAPIUUID
        return callAuthUser(username, password, sessionAPIUUID)
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

const headers = {
  VersionCode: constants.VersionCode,
  ApplicationUUID: constants.ApplicationUUID,
  Accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded'
}

function callAuthAPI () {
  const config = {
    headers: headers,
    method: 'POST',
    url: `${constants.BaseUrl}/logins/auth/api`,
    data: `ApiKey=${constants.ApiKey}&ApiSecret=${constants.ApiSecret}`,
  }
  return axios(config)
}

function callAuthUser (username, password, sessionAPIUUID) {
  const config = {
    headers: Object.assign({}, headers, {
      sessionAPIUUID: sessionAPIUUID
    }),
    method: 'POST',
    url: `${constants.BaseUrl}/logins/auth/user`,
    data: `LoginUserId=${username}&LoginPassword=${password}`
  }
  return axios(config)
}
