import Vue from 'vue'

const directive = Vue.directive('preventReClick', {
  inserted: function(el, binding) {
    el.addEventListener('click', () => {
      // 默认 disabled为false
      if (!el.disabled) { // 为false进入当前函数
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 3000)
      }
    })
  }
})

const loadmore =   Vue.directive('loadmore', {
  bind(el, binding) {
    const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
    SELECTWRAP_DOM.addEventListener('scroll', function() {
      const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight
      if (CONDITION) {
        binding.value()
      }
    })
  }
})

export { directive, loadmore }
