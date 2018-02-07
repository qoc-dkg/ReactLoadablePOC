var axios = require('axios')
var LocalStrategy = require('passport-local').Strategy

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
        console.log('login failed', err)
        done(null, false)
      })
  }))
}

const headers = {
  VersionCode: '0.5.82',
  ApplicationUUID: 'B8FAA490-199F-4DA3-AFEE-CB6FEBE9A96C',
  Accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded'
}
const baseUrl = 'https://us-dev-api.qochealth.com/rest/'

function callAuthAPI () {
  const config = {
    headers: headers,
    method: 'POST',
    url: `${baseUrl}/logins/auth/api`,
    data: 'ApiKey=BE4530F3-8D58-44BC-B59E-1E5F147A5D36&ApiSecret=password',
  }
  return axios(config)
}

function callAuthUser (username, password, sessionAPIUUID) {
  const config = {
    headers: Object.assign({}, headers, {
      sessionAPIUUID: sessionAPIUUID
    }),
    method: 'POST',
    url: `${baseUrl}/logins/auth/user`,
    data: `LoginUserId=${username}&LoginPassword=${password}`
  }
  return axios(config)
}
