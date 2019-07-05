<template>
  <div id="app">
    <div id="nav">
      <img src="./assets/cetclogo.png" class="logo">
      <strong>模拟数据生成系统</strong>
      <div class="router">
        <router-link to="/">
          <Icon type="ios-home" size="22" class="icon"/>
          <span class="text">首页</span>
        </router-link>
        <router-link to="/help">
          <Icon type="ios-help-circle"  size="22"  class="icon"/>
          <span class="text">帮助</span>
        </router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
$mainColor: #2d8cf0;
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  display: flex;
  align-items: center;
  height:60px; 
  font-size: 14px; 
  line-height:60px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(48,128,254,.1);
  margin: 0px 0px 20px 0px;
  
  strong {
    font-family: '微软雅黑';
    font-size:20px;
  }

  .router {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    padding-right: 30px;
    a {
      display: flex;
      align-items: center;
      margin-left: 20px;
      color: #666;
    }
    .router-link-exact-active {
      color: $mainColor;
    }
  }
  
  .logo {
    height: 26px;
    margin: 0 10px 0 20px;
  }
  .text{
    font-size: 14px;
  }
  // .icon{
  //   height: 28px;
  //   width: 1.7%;
  //   margin-top: 15px;
  //   margin-left: 30px;
  // }
  
}
.ivu-col {
  display: flex !important;
  align-content: column !important;
  align-items: column !important;
  justify-content: flex-start !important;
  justify-items: column !important;
}
</style>

<script>
import { Icon } from 'iview';
export default {
  components: {
    Icon,
  }
}
</script>

