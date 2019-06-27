import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'iview/dist/styles/iview.css';
import { Message } from 'iview';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false;
Vue.prototype.$Message = Message;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
