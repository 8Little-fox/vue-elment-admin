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

        <el-form-item prop="md5_password">
          <div class="m-t-20">
            <MDInput
              v-model="login_data.md5_password"
              type="password"
              icon="el-icon-search"
              name="title"
              placeholder="请输入密码"
            >密码
            </MDInput>
          </div>
        </el-form-item>

        <el-form-item prop="captcha">
          <div class="fx m-t-20">
            <MDInput
              v-model="login_data.captcha"
              style="flex: 1;"
              type="text"
              :maxlength="4"
              icon="el-icon-search"
              name="title"
              placeholder="请输入验证码"
            >验证码
            </MDInput>
            <div
              class="code-btn"
              @click="commonCaptcha"
            >
              <img
                :src="code_img"
                style="width: 100%;height: 100%;"
              >
            </div>
          </div>
        </el-form-item>

      </el-form>
      <div class="login-btn">
        <el-button
          v-preventReClick
          type="primary"
          @click="adminPortal_loginByTelPassword"
        >登 录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import MDInput from '@c/MDinput'
import md5 from 'js-md5'

export default {
  name: 'PassWordLogin',
  components: {
    MDInput
  },
  data() {
    return {
      /* 图形验证 */
      code_img: '',
      /* 登陆参数 */
      login_data: {
        phonenum: '',
        md5_password: '',
        captcha: '',
        key: ''
      },
      rules: {
        phonenum: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        md5_password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.commonCaptcha()
  },
  methods: {
    /**
     * @Description: 获取图形验证码
     * @Author: WenBo Wei
     * @Date: 2020/9/7
     * @param:
     * @return:
     */
    commonCaptcha() {
      window._api.common_captcha({}).then(res => {
        this.code_img = res.img
        this.login_data.key = res.key
      })
    },
    /**
     * @Description: 登陆按钮
     * @Author: WenBo Wei
     * @Date: 2020/9/4
     * @param:
     * @return:
     */
    adminPortal_loginByTelPassword() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let params = {
            phonenum: this.login_data.phonenum,
            md5_password: md5(this.login_data.md5_password),
            captcha: this.login_data.captcha,
            key: this.login_data.key
          }
          window._api.adminPortal_loginByTelPassword(params).then(res => {
            this.$store.dispatch('user/login', res.account_auth).then(() => {
              this.$router.push('/')
            })
          }).catch(() => {
            this.$refs.loginForm.resetFields()
            this.commonCaptcha()
          })
        } else {
          this.$refs.loginForm.resetFields()
          this.commonCaptcha()
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
