/* eslint-disable */
import { Message } from 'element-ui'
import { Loading } from 'element-ui'
import request from '@/utils/request'
import { apiList, netWorkErrorMsg } from './api'

var requests = {}
apiList.forEach(add)

// 检查是否有重复命名的api方法
if (process.env.NODE_ENV === 'development') {
  var methodNames = apiList.map((val) => val.name)
  while (methodNames.length) {
    var name = methodNames.pop()
    if (methodNames.includes(name)) {
      throw new Error('重复的api方法命名：' + name)
    }
  }
  while (apiList.length) {
    var item = apiList.pop()
    if (item.url.replace(/\//g, '_') !== item.name) {
      throw new Error('api方法命名不规范：' + item.name)
    }
  }
}

function add({ name, url, method = 'get', msg = netWorkErrorMsg, isLoading = false }) {
  requests[name] = function(params = {}) {
    let loading
    if (isLoading) {
      loading = Loading.service({
        lock: true,
        text: '',
        spinner: 'el-icon-my-loading',
        background: 'hsla(224,15%,20%,0.8)'
      })
    }
    return new Promise((resolve, reject) => {
      request({
        url,
        method,
        ...{ [method === 'get' ? 'params' : 'data']: params }
      })
        .then((res) => {
          if (isLoading) loading.close()
          if (res.code === 200) {
            resolve(res.data)
          } else {
            reject(res)
            Message({ type: 'error', message: res.msg })
          }
        })
        .catch((e) => {
          if (isLoading) loading.close()
          Message({ type: 'error', message: msg })
          reject()
        })
    })
  }
}

/**
 * 发送请求
 * @author 张振东
 * @param {object} params  接口参数
 * @param {object} options 可选，接口配置，用来在使用时覆盖设置loading和msg，参见上方add函数的说明
 * @return {promise} 成功时(result == true)：resolve，返回ret字段
 *                   失败时(result == false)：reject，返回整个请求主体
 *                   超时时：reject，无返回
 */

window._api = requests
