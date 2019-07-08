import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'iview/dist/styles/iview.css';
import { Message } from 'iview';
import { getCookies } from '@/utils/cookies.js'

Vue.config.productionTip = false;
Vue.prototype.$Message = Message;

router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数
  // next();
  if ( to.meta.requireAuth ){
    if(getCookies() ) {
      next();
    } else {
      next({
        path: '/responsibility'
    })
    }
  } else {
    next();
  }
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
