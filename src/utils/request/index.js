import qs from 'qs'
import axios from 'axios'
import { DEVAPI, PRODAPI, VERSION, ENCRYPT } from '@/../my-config'
import requestDataHandler from './requestDataHandler'
import responseDataHandler from './responseDataHandler'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? PRODAPI : DEVAPI,
  timeout: 30000,
  headers: {
    'Client-Verison': VERSION,
    'Client-Type': 'WEB',
    'Enable-App-Encrypt': ENCRYPT,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: qs.stringify
})
// axios.defaults.withCredentials = true

service.interceptors.request.use(requestDataHandler, error => {
  return Promise.reject(error)
})
service.interceptors.response.use(responseDataHandler)

export default service
