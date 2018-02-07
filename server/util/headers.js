const SHA256 = require('crypto-js/sha256');

module.exports = {
  getSignatureFromBody: function (sharedSecret, bodyData) {
    let secretString = ''
    let timeStamp = new Date().getTime()
    // look for 'Body' field
    secretString += 'Body=' + bodyData + '&'

    secretString += 'SharedSecret=' + sharedSecret
    secretString += '&DateTimeStamp=' + timeStamp
    secretString += '{' + sharedSecret + '}'

    return {
      Signature: SHA256(secretString).toString(),
      DateTimeStamp: timeStamp
    }
  },
  getSignatureFromQueryString: function (sharedSecret, url) {
    let secretString = ''
    let splitArray = url.split('?')
    let params = []
    let splitParams = []
    let timeStamp = new Date().getTime()

    if (splitArray.length > 1) {
        params = url.split('?').slice(1)
        splitParams = params[0].split('&')
        if (splitParams.length > 1) {
          splitParams.sort().forEach(item => {
            secretString += item + '&'
          })
        } else {
          secretString += splitParams + '&';
        }
    }
    secretString += 'SharedSecret=' + sharedSecret
    secretString += '&DateTimeStamp=' + timeStamp
    secretString += '{' + sharedSecret + '}'

    return {
      Signature: SHA256(secretString).toString(),
      DateTimeStamp: timeStamp
    }
  }
}
