<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">HI~</div>
      <div class="ms-subtitle">欢迎登录XX后台</div>
      <el-form
        ref="loginForm"
        :model="login_data"
        :rules="rules"
      >
        <el-form-item prop="phonenum">
          <MDInput
            v-model="login_data.phonenum"
            type="text"
            :maxlength="11"
            icon="el-icon-search"
            name="title"
            placeholder="请输入手机号码"
          >手机号
          </MDInput>
        </el-form-item>
        <el-form-item prop="code">
          <div class="fx m-t-20">
            <MDInput
              v-model="login_data.code"
              style="flex: 1;"
              type="text"
              :maxlength="6"
              icon="el-icon-search"
              name="title"
              placeholder="请输入验证码"
            >验证码
            </MDInput>
            <div
              v-if="isActive"
              class="code-btn"
              @click="commonSendVerifyCode"
            >获取验证码
            </div>
            <div
              v-else
              class="code-btn"
            >剩余{{ countSec }}秒
            </div>
          </div>
        </el-form-item>

      </el-form>
      <div class="login-btn">
        <el-button
          v-preventReClick
          type="primary"
          @click="companyPortalLoginByTelCode"
        >登 录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import MDInput from '@c/MDinput'

export default {
  name: 'CodeLogin',
  components: {
    MDInput
  },
  data() {
    return {
      /* 将获取验证码切换位倒计时 */
      isActive: true,
      /* 验证码倒计时 */
      countSec: 0,
      /* 登陆参数 */
      login_data: {
        phonenum: '',
        code: ''
      },
      rules: {
        phonenum: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    /**
     * @Description: 获取验证码
     * @Author: WenBo Wei
     * @Date: 2020/9/4
     */
    commonSendVerifyCode() {
      let isIDCard2 = /^1([3456789])\d{9}$/
      let { phonenum } = this.login_data
      if (phonenum && isIDCard2.test(phonenum)) {
        this.isActive = false
        this.countSec = 30
        let timmer = setInterval(() => {
          this.countSec--
          if (this.countSec <= 0) {
            this.isActive = true
            clearInterval(timmer)
          }
        }, 1000)
        window._api.common_sendVerifyCode({ phonenum }).then(() => {
          this.$message.success('发送成功')
        })
      } else {
        this.$message.warning('请输入正确手机号码')
      }
    },
    /**
     * @Description: 登陆按钮
     * @Author: WenBo Wei
     * @Date: 2020/9/4
     * @param:
     * @return:
     */
    companyPortalLoginByTelCode() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          window._api.companyPortal_loginByTelCode(this.login_data).then(res => {
            this.$store.dispatch('user/login', res.account_auth).then(() => {
              this.$router.push('/')
            })
          }).catch(() => {
            this.$refs.loginForm.resetFields()
          })
        } else {
          this.$refs.loginForm.resetFields()
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(~@img/login/bg-login.png);
    background-size: 100%;
  }

  .ms-title {
    width: 100%;
    line-height: 34px;
    font-size: 45px;
    color: #000000;
    text-align: left;
    font-weight: 600;
  }

  .ms-subtitle {
    width: 100%;
    line-height: 26px;
    font-size: 27px;
    margin-top: 30px;
    padding-bottom: 40px;
    color: #666666;
    text-align: left;
    font-weight: normal;
  }

  .ms-login {
    position: absolute;
    left: 67%;
    top: 50%;
    width: 476px;
    margin: -190px 0 0 -255px;
    border-radius: 5px;
    overflow: hidden;
  }

  .login-btn {
    text-align: center;
    margin-top: 50px;
  }

  .login-btn button {
    width: 476px;
    height: 61px;
    background: #3743d6;
    border-radius: 30px;
    font-size: 16px;
  }

  .code-btn {
    margin-top: 14px;
    width: 120px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    border-radius: 30px;
    border: 1px solid #3743d6;
    color: #3743d6;
    cursor: pointer;
  }

  /deep/ .el-form-item__content {
    line-height: 0 !important;
  }

  @media screen and (min-width: 1920px) {
    .login-wrap {
      zoom: 1;
    }
  }

  @media screen and (max-width: 1770px) {
    .login-wrap {
      zoom: 0.9;
    }
  }

  @media screen and (max-width: 1600px) {
    .login-wrap {
      zoom: 0.8;
    }
  }

  @media screen and (max-width: 1440px) {
    .login-wrap {
      zoom: 0.7;
    }
  }

  @media screen and (max-width: 1366px) {
    .login-wrap {
      zoom: 0.6;
    }
  }
</style>
