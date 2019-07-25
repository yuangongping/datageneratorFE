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

        <!-- <div class="community">
          <div class="menu">
              <Menu  mode="horizontal"  @on-select="toSelect" active-name="case" >
              <MenuItem name="case_admin" >
                  <Icon type="ios-briefcase" />
                  案例
              </MenuItem>
              <MenuItem name="suggestion_admin"  > 
                  <Icon type="ios-chatbubbles" />
                  意见            
              </MenuItem>
              </Menu>
              <router-view class="router-view"/>  
          </div> 
        </div>  -->


    </div>
</template>
<style lang="scss">

</style>
<script>
import { Icon, Modal, Form, FormItem, Button, Input, MenuItem, Menu } from 'iview';
import { apiLogin } from '../api/user.js'
import { setAuth, getAuth } from '../utils/cookies.js'
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
    Icon, Modal, Form, FormItem, Button, Input, MenuItem, Menu
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
