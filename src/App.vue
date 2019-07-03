<template>
  <div id="app">
    <div id="nav">
      <span class="logo">模拟数据生成系统</span>
      <router-link to="/">
        <Icon type="ios-home" size="22" class="icon"/>
        <span>首页</span>
      </router-link>
      <router-link to="/about">
        <Icon type="ios-help-circle"  size="22"  class="icon"/>
        <span>帮助</span>
      </router-link>
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
  // text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 20px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(48,128,254,.1);
  margin: 0px 0px 20px 0px;
  .logo{
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 22px;
    color: $mainColor;
    font-weight: 700;
    margin-right: 2.5%;
  }
  .icon{
    height: 28px;
    width: 1.7%;
  }
  a {
    margin-right: 2.5%;
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: $mainColor;
    }
  }
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

