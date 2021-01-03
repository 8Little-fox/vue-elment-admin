<template>
  <component :is="different_login" />
</template>

<script>
/* 手机号 + 手机验证码 */
import CodeLogin from './components/CodeLogin'
/* 手机号 + 密码 + 图形验证码 */
import PassWordLogin from './components/PassWordLogin'

export default {
  name: 'Login',
  components: {
    CodeLogin,
    PassWordLogin
  },
  data() {
    return {
      /* 切换展示不同登陆 */
      different_login: 'PassWordLogin'
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped>
</style>
