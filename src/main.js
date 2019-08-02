import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'iview/dist/styles/iview.css';
import { Message } from 'iview';
import { getAuthTime } from '@/utils/cookies.js'
import { getAuth } from '@/utils/cookies.js'

Vue.config.productionTip = false;
Vue.prototype.$Message = Message;

const routerWhiteList = ['/responsibility'];
const routerBlackList = ['/community_admin/case_admin', '/community_admin/suggestion_admin', '/visual'];
router.beforeEach((to, from, next) => {
    // 记录路由，登录后从哪来让他到哪去
    window.sessionStorage.formQuery = from.path
    if (routerWhiteList.indexOf(to.path) === -1) {
        if (getAuthTime()) {
            next();
        } else {
            next({
                path: '/responsibility'
            })
        }
        // 如果访问的是黑名单，即管理员的操作路由
        if(routerBlackList.indexOf(to.path)  !== -1){
            if ( getAuth() ) {
                next();
            } else{
                next('/admin');
            }
        }
        
    } else {
        next();
    }
});


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');