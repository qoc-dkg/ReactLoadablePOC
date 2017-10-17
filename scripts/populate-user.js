const mongoose = require('mongoose')
const configDB = require('./config/database.js')
const User = require('./app/models/user')

const username = 'patient'
const password = '1111'

const newUser = new User()

Object.assign(newUser, {
  username,
  password: newUser.generateHash(password)
})

mongoose.connect(configDB.url)
newUser.save(err => {
  (err && console.log(err)) || console.log(`created user ${username}`)
  process.exit()
})
