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
const util = require(path.join(__dirname, './util/headers.js'))

apiProxy.on('proxyReq', function (proxyReq, req, res, options) {
  let secureHeaders = {}
  let bodyData = ''
  let hasBodyData = req.body && Object.keys(req.body).length
  if (req.user && req.isAuthenticated()) {
    let getSignatureMethod = util.getSignatureFromQueryString.bind(null,
      req.user.sharedSecret, options.target.href)

    if (hasBodyData) {
      bodyData= JSON.stringify(req.body)
      getSignatureMethod = util.getSignatureFromBody.bind(null,
        req.user.sharedSecret, bodyData)
    }
    secureHeaders = Object.assign({},
      getSignatureMethod(),
      {
        sessionAPIUUID: req.user.sessionAPIUUID,
        sessionUUID: req.user.sessionUUID
      }
    )
  }
  Object.keys(secureHeaders).forEach(key => {
    proxyReq.setHeader(key, secureHeaders[key])
  })
  if (hasBodyData) {
    bodyData = 'Body=' + bodyData
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
