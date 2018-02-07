const SHA256 = require("crypto-js/sha256");

module.exports = function (sharedSecret, url) {
  const secretString = ''
  const splitArray = url.split('?');
  const params = []
  const splitParams = []
  const timeStamp = new Date().getTime()

  if (splitArray.length > 1) {
      params = url.slice(1).split('')
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
