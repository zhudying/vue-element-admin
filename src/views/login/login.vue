<template>
  <div class='login'>
    <loginPage
      :loginTitle="loginTitle"
      @enterLogin="enterLogin"
    />
  </div>
</template>

<script>
import loginPage from '@/components/login/login';
import { getLogin, getRoles } from '@/api/login';
import { mapActions } from 'vuex';
export default {
  name: 'login',
  components: {
    loginPage
  },
  data() {
    return {
      loginTitle: {
        title: 'xx后台管理系统',
        enTitle: 'xxx'
      }
    }
  },
  computed: {

  },
  methods: {
    ...mapActions({
      LOGIN: 'LOGIN'
    }),
    enterLogin(val) {
      this.LOGIN().then(res => {
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
}
</style>
