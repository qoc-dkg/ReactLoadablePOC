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

const configDB = require('./config/database.js')

mongoose.connect(configDB.url)
require('./config/passport')(passport)

app.use(morgan('dev'));
app.use(cookieParser())
app.use(bodyParser())

app.use(session({
  secret: 'perrierandrunningshoes'
}))
app.use(passport.initialize())
app.use(passport.session())

require('./app/routes.js')(app, passport)
app.listen(port)
