<template>
  <div class="responsibility">
    <div>
      <h3>{{ title }}</h3>
      <p>{{ intriduction }}</p>
      <ul>
        <li v-for="data in terms" :key="data">{{ data }}</li>
      </ul>
      <strong v-if="authTime" class="agreed">
          您已于 {{ authTime }} 同意所有声明条款
      </strong>
      <Button v-else class="confirm" type="primary" @click="confirm">阅读并同意所有条款</Button>

    </div>
  </div>
</template>

<style lang="scss">
.responsibility {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: #333333;
  line-height: 45px;
  div {
    width: 800px;
  }
  h3 {
    margin-bottom: 20px;
  }
  p {
    margin-bottom: 20px;
  }
  ul {
    margin-left: 23px;
    padding-left: 0;
  }
  .confirm {
    margin-top: 50px;
    margin-left: 45%;
  }
  .agreed {
    color: #ff3d3d;
  }
}
</style>

<script>
import { Button } from 'iview';
import { setAuthTime, getAuthTime } from '@/utils/cookies.js';
export default {
    data(){
        return {
            title: "免责声明",
            intriduction: "系统提醒您：在使用该系统前，请您务必仔细阅读并透彻理解本声明。\
                           您可以选择不使用本系统，但如果您使用本系统，您的使用行为将被视为对本声明全部内容的认可。",
            terms: [
                "鉴于本系统模拟数据均为随机组合数据，无法确定模拟数据的完整性、准确性、及时性、合法性，\
                所以本系统对模拟出的结果不承担责任。如果用户因使用本系统数据作为任何商业行为或者学术研究的依据而产生不良后果，\
                本系统不承担任何法律责任。",

                "您应该对使用本系统生成的数据结果自行承担风险。系统不做任何形式的保证：不保证搜索结果满足您的要求，\
                 不保证数据的安全性、正确性、及时性、合法性。对于应用数据而产生的分析结果不承担任何法律责任。",

                 "系统尊重并保护所有使用用户的个人隐私权，您注册的用户名、电子邮件地址等个人资料，\
                  非经您亲自许可或根据相关法律、法规的强制性规定，百度不会主动地泄露给第三方。\
                  系统提醒您：您在使用系统模拟过程中，生成的数据记录将不被认为是您的个人隐私资料。"
            ]
        }
    },
    computed: {
        authTime: () => {
            return getAuthTime();
        }
    },
    components: {
        Button
    },
    methods: {
        formatNumber(str){
            let num;
            str > 9 ? num = str : num = "0" + str;
            return num;
        },
        getTime(){
            const date = new Date();
            const time = date.getFullYear() + "年"
              + this.formatNumber((date.getMonth() + 1))+ "月"
              + this.formatNumber(date.getDate()) + "日 " 
              + this.formatNumber(date.getHours()) + ":" 
              + this.formatNumber(date.getMinutes()) + ":" 
              + this.formatNumber(date.getSeconds());
            return time;
        },
        confirm(){
            setAuthTime(this.getTime());
            this.$router.push({ path: '/' })
        }
    }
}
</script>

