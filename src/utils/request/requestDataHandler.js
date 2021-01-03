import { getToken } from '../tool/storage'
import { ENCRYPT } from '@/../my-config'
import { aesEncrypt } from '../tool/aes'

//  请求拦截器
export default function requestDataHandler(req) {
  console.log('%c请求拦截器：', 'color:#ffa502;font-size:20px;font-weight:bold;', req)
  if (ENCRYPT) {
    req = aesEncrypt(req)
  }
  req.headers['Authorization'] = getToken() || ''
  return req
}
