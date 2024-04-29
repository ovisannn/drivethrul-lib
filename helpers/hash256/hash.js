import 'dotenv/config'
import cryptoJs from 'crypto-js';
import CryptoJS from 'crypto-js';
// const crypto = require("crypto")
export function Encrypt (password) {
    var encrypted = cryptoJs.AES.encrypt(password, process.env.SECRETKEY).toString()
    return encrypted
}

export function ValidatePassword(inputPassword, encryptedPassword){
  var bytes = cryptoJs.AES.decrypt(encryptedPassword, process.env.SECRETKEY)
  var originalPassword = bytes.toString(CryptoJS.enc.Utf8)

  if(originalPassword === inputPassword){
    return true
  }
  
  return false
  // result should be true or false
}