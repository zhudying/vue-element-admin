<template>
  <div class="login_inner">
    <div class="login_inner_title">
      <span class="login_inner_title_ch">{{loginTitle.title}}</span>
      <span class="login_inner_title_en">{{loginTitle.enTitle}}</span>
    </div>
    <div class="login_inner_form">
      <el-input
        v-model="loginForm.userName"
        placeholder="请输入手机号"
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
        <div class="login_change_remind">记住密码</div>
        <div
          class="login_change_code"
          @click="changeLogin"
        >登录方式</div>
      </div>
      <div
        class="login_enter"
        @click="enterPage"
      >
        登录
      </div>
    </div>
  </div>
</template>

<script>
import { validPhone, validNumber } from '@/utils/validate'
export default {
  name: 'loginPassword',
  props: {
    loginTitle: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      loginForm: {},
      nameShow: false,
      codeName: '获取验证码',
      // 防止重复点击
      clickCode: false
    }
  },
  methods: {
    // 登录方式
    changeLogin () {
      this.nameShow = !this.nameShow
    },
    // 手机号只能输入数字
    inputHandle (val) {
      let number = validNumber(val)
      if (!number) this.loginForm.userName = ''
    },
    // 获取验证码
    getCode () {
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
    timer () {
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
    // 登录
    enterPage () {
      if (!this.loginForm.userName) {
        this.$message.error('请输入手机号')
        return
      }
      let befalse = validPhone(this.loginForm.userName)
      console.log(befalse, 'befalse')
      if (!befalse) {
        this.$message.error('请正确的输入手机号')
        return
      }

      if (!this.loginForm.passWord) {
        this.$message.error('请输入密码')
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
