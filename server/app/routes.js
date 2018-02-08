const path = require('path')
const fs = require('fs')
const constants = require(path.join(__dirname, '../config/constants.js'))

const apiRegex = /^\/api\/(.+)/
const headers = {}
headers['VersionCode'] = constants.VersionCode
headers['ApplicationUUID'] = constants.ApplicationUUID
headers['Accept'] = 'application/json'
headers['Accept-Language'] = 'en-us'
headers['Content-Type'] = 'application/x-www-form-urlencoded'
headers['APIVersion'] = '1.100000'
headers['ClientLocale'] = 'en_CA'

module.exports = function (app, passport, apiProxy) {
  const isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.send(401, {
      message: 'Not authorized'
    })
  }

  app.get(/^\/(build\/)?(dashboard.js)$/, isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../../build/' + req.params[1]));
  })

  app.get(/^\/assets\/(.+)/, (req, res) => {
    res.sendFile(path.join(__dirname, '../../assets/' + req.params[0]))
  })

  app.get(/^\/build\/(.+)/, (req, res) => {
    res.sendFile(path.join(__dirname, '../../build/' + req.params[0]))
  })

  app.get(/^\/(?!api.*).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../../index.html'));
  })

  app.get('/api/check-session', function (req, res) {
    const payload = req.isAuthenticated()
      ? 'hasSession'
      : 'noSession'
    res.send(200, payload)
  })

  app.post('/api/login', function (req, res) {
    passport.authenticate('login', function (err, user) {
      if (!user) {
        return res.send(401, {
          message: 'Incorrect username or password'
        })
      }
      req.logIn(user, function (err) {
        return res.send(200, user)
      })
    })(req, res)
  })

  app.post('/api/logout', function (req, res) {
    if (req.isAuthenticated()) {
      req.logout();
    }
    res.send(200, 'logged out')
  })

  app.delete(apiRegex, isAuthenticated, proxyCall)
  app.put(apiRegex, isAuthenticated, proxyCall)
  app.post(apiRegex, isAuthenticated, proxyCall)
  app.get(apiRegex, isAuthenticated, proxyCall)

  function proxyCall(req, res) {
    const queryString = req.url.indexOf('?') > -1
      ? '?' + req.url.split('?').pop()
      : ''

    apiProxy.web(req, res, {
      ssl: {
        key: fs.readFileSync(path.join(__dirname, '../config/ssl/valid-ssl-key.key'), 'utf8'),
        cert: fs.readFileSync(path.join(__dirname, '../config/ssl/valid-ssl-cert.cert'), 'utf8')
      },
      ignorePath: true,
      target: `https://us-dev-api.qochealth.com/rest/${req.params[0]}${queryString}`,
      secure: true,
      changeOrigin: true,
      headers: headers
    })
  }
}
