const express = require('express')
const path = require('path')

module.exports = function (app, passport) {
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
    res.sendFile(path.join(__dirname, '../build/dashboard.js'));
  })

  app.get(/^\/assets\/(.+)/, (req, res) => {
    res.sendFile(path.join(__dirname, '../assets/' + req.params[0]))
  })

  app.get(/^\/build\/(.+)/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build/' + req.params[0]))
  })

  app.get(/^\/(?!api.*).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
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
}
