const axios = require('axios')
const path = require('path')
const constants = require(path.join(__dirname, '../config/constants.js'))

const headers = {
  VersionCode: constants.VersionCode,
  ApplicationUUID: constants.ApplicationUUID,
  Accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded'
}

module.exports = {
  callAuthAPI: callAuthAPI,
  callAuthUser: callAuthUser
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
