import * as qiniu from 'qiniu-js'
import { QINIUSPACE } from '@/../my-config'
import { Loading } from 'element-ui'

function getQiNiuToken() {
  return new Promise(resolve => {
    window._api.common_getQiniuToken({}).then(res => {
      resolve(res)
    })
  })
}

export default async function(file, callBack) {
  Loading.service({
    text: '上传中...',
    background: 'rgba(255,255,255,0.5)'
  })
  getQiNiuToken().then(token => {
    let key = new Date().getTime() + file.name
    let observable = qiniu.upload(file, key, token)
    let cb = {
      next(res) {
        let percent = res.total.percent
        callBack(percent)
      },
      complete(res) {
        let final_url = QINIUSPACE + res.key
        Loading.service().close()
        callBack(final_url)
      },
      error(err) {
        Loading.service().close()
      }
    }
    observable.subscribe(cb)
  })
}
