// 过滤器
import Vue from 'vue'

/**
 * @Description: 千分位的字符过滤器
 * @Author: WenBo Wei
 * @Date: 2020/9/3
 * @param: val 过滤的数字 Number
 * @return: 千分位的数字
 */
Vue.filter('thousands', (val) => {
  if (typeof (val) === 'number') {
    let int_part = Number(val).toFixed(0) // 获取整数部分
    return int_part.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  }
})

/**
 * @Description: 人民币数字转换为大写
 * @Author: WenBo Wei
 * @Date: 2020/9/3
 * @param: n 人民币数值
 * @return: 大写的人民币
 *  let head = n < 0 ? '负人民币' : '人民币'
 *  小数时为负
 */
Vue.filter('RMBcapital', (n) => {
  let fraction = ['角', '分', '厘']
  let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  let unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ]
  let head = n < 0 ? '负人民币' : '人民币'
  n = Math.abs(n)
  let s = ''
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
  }
  s = s || '整'
  n = Math.floor(n)
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = ''
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(n / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }
  return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
})

/**
 * @Description: 名字，身份证，银行卡，隐藏部分数字变‘*’号  （需要字符串）
 * @Author: WenBo Wei
 * @Date: 2020/9/3
 * @param: str 需要转换的字符串
 * @param: frontLen 前面保留位数
 * @param: endLen 后面保留位数
 * @return:
 */
Vue.filter('plusXing', (str, frontLen, endLen) => {
  let len = str.length - frontLen - endLen
  let xing = ''
  for (let i = 0; i < len; i++) {
    xing += '*'
  }
  return str.substring(0, frontLen) + xing + str.substring(str.length - endLen)
})
