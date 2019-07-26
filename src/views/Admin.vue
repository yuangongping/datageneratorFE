<template>
    <div class="user">
        <Modal
            title="管理员登录"
            v-model="loginFlag"
            :mask-closable="false"
            :footer-hide="true"
            :closable="false"
            >
              <Form ref="formInline" :model="formLogin" inline>
                <FormItem>
                    <Input
                    type="text"
                    v-model="formLogin.username"
                    placeholder="Username"
                    prefix="ios-contact" />
                </FormItem>

                <FormItem>
                    <Input
                    type="text"
                    v-model="formLogin.password"
                    placeholder="Password"
                    prefix="ios-lock" />
                </FormItem>

                <FormItem>
                <Button @click="login" style="margin-left: 8px">登录</Button>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<style lang="scss">

</style>
<script>
import { Modal } from 'iview';
import { apiLogin } from '../api/user.js'
import { setAuth } from '../utils/cookies.js'
export default {
  data(){
      return {
        formLogin: {
            username: '',
            password: ''
        },
        name:"case",
        loginFlag: true,
      }
    },
  components: {
    Modal
  },

  methods: {
    // 登录
    async login () {
      try {
        const res = await apiLogin(this.formLogin)
        if (res.code === 200) {
          setAuth(this.formLogin.username);
          this.loginFlag = false;
          this.$router.push('/community_admin');
        }
      } catch(e) {
        this.$Message.error(e.msg)
      }
    },
    // 切换案例、意见
    toSelect(name) {
      this.$router.push(name)
    }
  } 

}
</script>
