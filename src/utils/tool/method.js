/**
 * @Description: 解决Mustache语法调用对象属性>=三级时的异常抛错
 * @Author: WenBo Wei
 * @Date: 2020/9/8
 * @param: str 解析的对象属性
 * @return: 是否存在该变量 ? 展示该变量 : 展示暂无数据
 * tip : {{ $$('user_info.family_num.father_name') }}
 */
export function optionalChaining(str) {
  if (str !== '') {
    let str_turn_arr = str.split('.')
    if (str_turn_arr.length <= 1) throw new Error('请向$$函数传递例如:user_ifo.user.name字符串参数')
    let str_turn_arr_first = this[str_turn_arr.shift()]
    for (let key in str_turn_arr) {
      let name = str_turn_arr[key]
      str_turn_arr_first = str_turn_arr_first?.[name]
    }
    return str_turn_arr_first || '暂无数据'
  }
}

/**
 * @Description: 防抖函数
 * @Author: WenBo Wei
 * @Date: 2020/9/4
 * @param: func 回调
 * @param: delay 时间（毫秒）
 */
export function debounce(func, delay) {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * @Description: 下载base64位的图片
 * @Author: WenBo Wei
 * @Date: 2020/9/4
 * @param: fileName 图片下载后的名称
 * @param: content base64码
 * @return: 下载图片
 * this.$tool.downloadFile('图片1.png','data:image/jpg;base64,iVBORw0KGgoAAA' )
 */
export function downloadFile(fileName, content) {
  let aLink = document.createElement('a')
  let blob = this.base64ToBlob(content) // new Blob([content]);
  let evt = document.createEvent('HTMLEvents')
  evt.initEvent('click', true, true)// initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, 'chart-download' + '.' + 'png')
  } else {
    aLink.download = fileName
    aLink.href = URL.createObjectURL(blob)
    aLink.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))// 兼容火狐
  }
}

/**
 * @Description: base64转blob
 * @Author: WenBo Wei
 * @Date: 2020/9/4
 * @param: code 图片的base64码
 */
export function base64ToBlob(code) {
  let parts = code.split(';base64,')
  let contentType = parts[0].split(':')[1]
  let raw = window.atob(parts[1])
  let rawLength = raw.length
  let uInt8Array = new Uint8Array(rawLength)
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }
  return new Blob([uInt8Array], { type: contentType })
}

/**
 * @Description: 将url请求参数转为json格式
 * @Author: WenBo Wei
 * @Date: 2020/9/4
 * @param: url 网络路径字符串
 * @return: Object 将路径后方进行解析
 * this.$tool.paramUrl('https://music.163.com/#/song?id=27180681')
 */
export function paramUrl(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

/**
 * @Description: 多个base64导出为Zip文件
 * @Author: WenBo Wei
 * @Date: 2020/9/4
 * @param: img_list 图片数组
 * @param: zip_name zip文件名称
 * @return: 下载ZIP包
 * this.$tool.downloadZipImg([{name: '图片1', baseImg: 'data:image/jpg;base64,iVB'}, { name: '图片2', baseImg: 'data:image/jpg;base64,/9j/4AAQSkZJRg' }], 'imgs')
 */
// 导入下载Zip的插件
import JSZip from 'jszip'
import FileSaver from 'file-saver'

export function downloadZipImg(img_list, zip_name) {
  let zip = new JSZip()
  let imgs = zip.folder(zip_name)
  let baseList = []
  for (let i = 0; i < img_list.length; i++) {
    let name = img_list[i].name // 图片名称
    let image = new Image()
    // 解决跨域 Canvas 污染问题
    image.setAttribute('crossOrigin', 'anonymous')
    image.onload = function() {
      let canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      let context = canvas.getContext('2d')
      context.drawImage(image, 0, 0, image.width, image.height)
      let url = canvas.toDataURL() // 得到图片的base64编码数据 let url =
      canvas.toDataURL('image/png')
      baseList.push({ name: name, img: url.substring(22) })
      if (baseList.length === img_list.length) {
        if (baseList.length > 0) {
          for (let k = 0; k < baseList.length; k++) {
            imgs.file(baseList[k].name + '.png', baseList[k].img, {
              base64: true
            })
          }
          zip.generateAsync({ type: 'blob' }).then(function(content) {
            FileSaver.saveAs(content, zip_name + '.zip')
          })
        }
      }
    }
    image.src = img_list[i].baseImg
  }
}

/**
 * @Description: 判断某个字符串是否为JSON
 * @Author: WenBo Wei
 * @Date: 2020/9/7
 * @param: str 待解析的变量 String
 * @return: Boolean
 */
export function isJSON(str) {
  if (typeof str === 'string') {
    try {
      let obj = JSON.parse(str)
      if (typeof obj === 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }
  console.log(`${str}It is not a string!`)
}

// debounce 防抖函数
// paramUrl 将url请求参数转为json格式
// downloadFile 下载图片
// base64ToBlob base64转blob
// downloadZipImg 多个base64导出为Zip文件
// isJSON 判断是字符串是否为JSON
