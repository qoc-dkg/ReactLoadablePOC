const express = require('express')
const path = require('path')
const fs = require('fs')

const versionCode = '0.5.82'
const applicationUUID = 'B8FAA490-199F-4DA3-AFEE-CB6FEBE9A96C'
const headers = {}
headers['VersionCode'] = versionCode
headers['ApplicationUUID'] = applicationUUID
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

  const serializeUser = ({username}) => ({username})

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

  app.get('/api/test', (req, res) => {
    console.log('test', req.isAuthenticated(), req.user)
    res.send(200, null)
  })

  app.get('/api/notifications', (req, res) => {
    console.log('authenticated?', req.isAuthenticated(), req.user)
    proxyCall(req, res, 'notifications')
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
        return res.send(200, serializeUser(user))
      })
    })(req, res)
  })

  app.post('/api/logout', function (req, res) {
    if (req.isAuthenticated()) {
      req.logout();
    }
    res.send(200, 'logged out')
  })

  function proxyCall(req, res, apiPath) {
    apiProxy.web(req, res, {
      ssl: {
        key: fs.readFileSync(path.join(__dirname, '../config/ssl/valid-ssl-key.key'), 'utf8'),
        cert: fs.readFileSync(path.join(__dirname, '../config/ssl/valid-ssl-cert.cert'), 'utf8')
      },
      ignorePath: true,
      target: `https://us-dev-api.qochealth.com/rest/${apiPath}`,
      secure: true,
      changeOrigin: true,
      headers: headers
    })
  }

}
