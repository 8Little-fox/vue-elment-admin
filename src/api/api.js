// 这两个方法本质上就是返回一个对象，可以根据需要自行增加修改
const get = (name, url, msg, isLoading) => ({ name, url, method: 'get', msg, isLoading })
const post = (name, url, msg, isLoading) => ({ name, url, method: 'post', msg, isLoading })

// 网络错误时message的提示文字
const netWorkErrorMsg = '网络错误,请稍后重试'

const apiList = [
  // 获取图形验证码
  get('common_captcha', 'common/captcha', '图形验证码获取失败'),
  // 根据手机号及密码登录
  post('adminPortal_loginByTelPassword', 'adminPortal/loginByTelPassword', '登陆失败'),
]

export { netWorkErrorMsg, apiList }

