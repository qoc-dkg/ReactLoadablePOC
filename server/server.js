const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 8080
const mongoose = require('mongoose')
const passport = require('passport')

const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer()
const getSecureHeaders = require(path.join(__dirname, './util/headers.js'))

apiProxy.on('proxyReq', function (proxyReq, req, res, options) {
  let secureHeaders = {}
  if (req.user && req.isAuthenticated()) {
    console.log('href', options.target.href)
    secureHeaders = Object.assign({},
      getSecureHeaders(req.user.sharedSecret, options.target.href),
      {
        sessionAPIUUID: req.user.sessionAPIUUID,
        sessionUUID: req.user.sessionUUID
      }
    )
  }
  Object.keys(secureHeaders).forEach(key => {
    proxyReq.setHeader(key, secureHeaders[key])
  })
  if (req.body) {
    let bodyData = Object.keys(req.body).map(key => {
      return key + '=' + req.body[key]
    }).join('&')
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
    // stream the content
    proxyReq.write(bodyData);
  }
});

require('./config/passport')(passport)

app.use(morgan('dev'));
app.use(cookieParser())
app.use(bodyParser())

app.use(session({
  secret: 'perrierandrunningshoes'
}))
app.use(passport.initialize())
app.use(passport.session())

require('./app/routes.js')(app, passport, apiProxy)
app.listen(port)
