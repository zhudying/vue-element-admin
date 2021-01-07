<template>
  <div class="login">
    <div class="login_inner">
      <div class="login_inner_title">
        <span class="login_inner_title_ch">{{loginTitle.title}}</span>
        <span class="login_inner_title_en">{{loginTitle.enTitle}}</span>
      </div>
      <div class="login_inner_form">
        <el-input
          v-model="loginForm.userName"
          :placeholder="nameShow?'请输入手机号':'请输入账号'"
          @input="inputHandle"
        >
          <template slot="prefix">
            <i class="el-icon-user-solid"></i>
          </template>
        </el-input>
        <!-- 密码登录 -->
        <el-input
          v-if="!nameShow"
          v-model="loginForm.passWord"
          placeholder="请输入密码"
          show-password
        >
          <template slot="prefix">
            <i class="el-icon-s-goods"></i>
          </template>
        </el-input>
        <!-- 验证码登录 -->
        <el-input
          v-if="nameShow"
          v-model="loginForm.passWord"
          placeholder="请输入验证码"
          class="login_code"
        >
          <template slot="prefix">
            <i class="el-icon-s-goods"></i>
          </template>
          <template slot="suffix">
            <p @click="getCode">{{codeName}}</p>
          </template>
        </el-input>

        <div class="login_change">
          <div>
            <el-checkbox
              v-if="!nameShow"
              v-model="remind"
              @change="changeRemind"
            >记住密码</el-checkbox>
          </div>
          <div @click="changeLogin">{{nameShow?'密码登录':'手机号登录'}}</div>
        </div>

        <div
          class="login_enter"
          @click="enterPage"
        > 登录
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { validPhone, validNumber } from '@/utils/validate'
import { setCookie, getCookie, clearCookie } from '@/utils/cookie'
export default {
  name: 'loginPassword',
  props: {
    loginTitle: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      loginForm: {
        userName: 'admin',
        passWord: 123456
      },
      nameShow: false,
      codeName: '获取验证码',
      // 防止重复点击
      clickCode: false,
      remind: false
    }
  },
  created() {
    let loginForm = getCookie('TEST_LOGINFORM')
    let remind = getCookie("TEST_REMIND")
    if (typeof remind === 'string') {
      this.remind = JSON.parse(remind)
    }
    if (typeof loginForm === 'string') {
      this.loginForm = JSON.parse(loginForm)
    }
  },
  methods: {
    // 登录方式
    changeLogin() {
      this.nameShow = !this.nameShow
      this.loginForm = {}
    },
    // 手机号只能输入数字
    inputHandle(val) {
      let number = validNumber(val)
      if (!number) this.loginForm.userName = ''
    },
    // 获取验证码
    getCode() {
      // 验证手机号
      if (!this.loginForm.userName) {
        this.$message.error('请输入手机号')
        return
      }

      let number = validPhone(this.loginForm.userName)
      if (!number) {
        this.$message.error('请正确的输入手机号')
        return
      }
      // 防止重复点击
      if (this.clickCode) {
        return
      }
      this.clickCode = true
      this.codeName = 60
      if (typeof this.codeName === 'number') {
        this.timer()
      }
    },
    // 倒计时
    timer() {
      let pro = setInterval((() => {
        if (this.codeName <= 0) {
          this.codeName = 0
          clearInterval(pro)
          this.clickCode = false
          return
        }
        this.codeName--
      }), 1000)
    },
    // 记住密码
    changeRemind(val) {
      setCookie("TEST_REMIND", JSON.stringify(val))
      if (val) {
        setCookie('TEST_LOGINFORM', JSON.stringify(this.loginForm), 1)
      } else {
        clearCookie('TEST_LOGINFORM')
      }
    },
    // 登录
    enterPage() {
      if (!this.loginForm.userName) {
        const warm = this.nameShow ? '请输入手机号' : '请输入账号'

        this.$message.error(warm)
        return
      }
      let befalse = validPhone(this.loginForm.userName)
      if (!befalse && this.nameShow) {
        this.$message.error('请正确的输入手机号')
        return
      }

      if (!this.loginForm.passWord) {
        const warm = this.nameShow ? '请输入验证码' : '请输入密码'

        this.$message.error(warm)
        return
      }
      let bflase = true
      this.$emit('enterLogin', bflase)
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/login_back.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  /deep/.login_inner {
    width: 500px;
    background-color: #fff;
    position: absolute;
    top: 20%;
    right: 30%;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 40px;
    .login_inner_title {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 40px;
      .login_inner_title_ch {
        font-size: 30px;
        color: $menuBg;
        margin-bottom: 10px;
      }
      .login_inner_title_en {
        font-size: 20px;
        color: $menuBg;
      }
    }
    .login_inner_form {
      /deep/.el-input {
        font-size: 14px;
        margin-bottom: 40px;
        .el-input__inner {
          border-radius: 100px;
          padding-left: 45px;
        }
        .el-input__prefix {
          line-height: 40px;
          left: 15px;
        }
      }
      .login_enter {
        height: 40px;
        width: 100%;
        line-height: 40px;
        background-color: $menuBg;
        border-radius: 100px;
        text-align: center;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
        margin-bottom: 20px;
      }
      .login_change {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 20px;
        height: 20px;
        margin-bottom: 10px;
        color: $menuBg;
        cursor: pointer;
      }
    }
    .login_code {
      /deep/.el-input__suffix {
        top: 50%;
        height: 26px;
        line-height: 26px;
        right: 15px;
        color: $menuBg;
        // border: 1px solid $menuBg;
        // border-radius: 100px;
        margin-top: -13px;
        padding: 0 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
