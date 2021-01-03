import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import '@/icons'
import '@/permission'

import * as tool from '@/utils/tool'
import CountTo from 'vue-count-to'
import { optionalChaining } from '@u/tool/method'

Vue.prototype.$tool = tool
Vue.prototype.$$ = optionalChaining
Vue.use(ElementUI)

Vue.component('count-to', CountTo) // 滚动数字

require('../api')
require('./directive')
require('./filters')
