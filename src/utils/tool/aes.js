import CryptoJS from 'crypto-js'
import { ENCRYPT } from '@/../my-config'

/**
 * @Description: 加密
 * @Author: WenBo Wei
 * @Date: 2020/7/22
 * @param data string 待加密数据字符串
 * @param secret string 秘钥
 * @param iv string 偏移量
 * @return string 加密后字符串
 */
export function encryptData(data, secret = '9ouxQY9ALwFhQaFj', iv = 'FQFBCcQh59HNFr2M') { // 加密
  let $secret = CryptoJS.enc.Utf8.parse(secret)
  let $iv = CryptoJS.enc.Utf8.parse(iv)
  let encrypted = CryptoJS.AES.encrypt(data, $secret, {
    iv: $iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  encrypted = encrypted.toString() // 返回的是base64格式的密文
  return encrypted
}

/**
 * @Description: 解密
 * @Author: WenBo Wei
 * @Date: 2020/7/22
 * @param data string 待解密数据字符串
 * @param secret string 秘钥
 * @param iv string 偏移量
 * @return string 解密后字符串
 */
export function decryptData(data, secret = '9ouxQY9ALwFhQaFj', iv = 'FQFBCcQh59HNFr2M') {
  let $secret = CryptoJS.enc.Utf8.parse(secret)
  let $iv = CryptoJS.enc.Utf8.parse(iv)
  let decrypted = CryptoJS.AES.decrypt(data, $secret, {
    iv: $iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

/**
 * @Description: AES的加密方法
 * @Author: WenBo Wei
 * @Date: 2020/9/14
 * @param: req 未加密的请求拦截器
 * @return: 加密之后的请求拦截器
 */
export function aesEncrypt(req) {
  if (ENCRYPT) {
    let secret = window.localStorage.getItem('secret')
    if (secret) secret.slice(0,16)
    let timestamp = ~~((new Date()).getTime() / 1000)
    let encrypt_data
    if (req.method === 'post') {
      if (!req.data) req.data = {}
      req.data['timestamp'] = timestamp
      if (secret) {
        encrypt_data = encryptData(JSON.stringify(req.data), secret)
      } else {
        encrypt_data = encryptData(JSON.stringify(req.data))
      }
      req.data = {
        data: encrypt_data
      }
    } else {
      if (!req.params) req.params = {}
      req.params['timestamp'] = timestamp
      if (secret) {
        encrypt_data = encryptData(JSON.stringify(req.params), secret)
      } else {
        encrypt_data = encryptData(JSON.stringify(req.params))
      }
      req.params = {
        data: encrypt_data
      }
    }
  }
  return req
}

/**
 * @Description: AES的解密方法
 * @Author: WenBo Wei
 * @Date: 2020/9/14
 * @param: res 加密的响应拦截器
 * @return: 解密之后的响应拦截器
 */
export function aesDecrypt(res) {
  if (ENCRYPT) {
    let secret = window.localStorage.getItem('secret')
    if (secret) secret.slice(0,16)
    let decrypt_data
    if (secret) {
      decrypt_data = decryptData(res.data.data, secret)
    } else {
      decrypt_data = decryptData(res.data.data)
    }
    res.data.data = JSON.parse(decrypt_data)
  }
  return res
}
