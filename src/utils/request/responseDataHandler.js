import router from '../../router'
import { Message } from 'element-ui'
import store from '../../store'
import { ENCRYPT } from '@/../my-config'
import { aesDecrypt } from '../tool/aes'

//  响应拦截器
export default function responseDataHandler(res) {
  if (ENCRYPT) {
    res = aesDecrypt(res)
  }
  console.log('%c响应拦截：', 'color:#1e90ff;font-size:20px;font-weight:bold;', res)
  if (res.data.code === 102 || res.data.code === 101) {
    store.dispatch('user/resetToken')
    router.replace('/login', () => Message({ type: 'info', message: '令牌失效，请重新登陆' }))
  }
  return res.data
}
