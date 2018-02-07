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
const getSecureHeaders = require(path.join(__dirname, '../util/headers.js'))

apiProxy.on('proxyReq', function (proxyReq, req, res, options) {
  let secureHeaders = {}
  if (req.user && req.isAuthenticated()) {
    secureHeaders = getSecureHeaders(req.user.sharedSecret)
  }

  if (req.body) {
    let bodyData = test
    // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
    proxyReq.setHeader('Content-Type','application/x-www-form-urlencoded');
    proxyReq.setHeader('Content-Length', Buffer.byteLength(test));
    // stream the content
    proxyReq.write(test);
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
