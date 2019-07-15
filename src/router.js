import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Case from './views/Case.vue'
import Suggestion from './views/Suggestion.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    
    {
      path: '/community',
      name: 'community',
      redirect: '/community/case',
      component: () => import(/* webpackChunkName: "community" */ './views/Community.vue'),
      children: [
        {
          path: 'case',
          name: 'case',
          component: Case
        },
        {
          path: 'suggestion',
          name: 'suggestion',
          component: Suggestion
        }
      ]
    },

    {
      path: '/help',
      name: 'help',
      component: () => import(/* webpackChunkName: "help" */ './views/Help.vue'),
    },

    {
      path: '/responsibility',
      name: 'responsibility',
      component: () => import(/* webpackChunkName: "responsibility" */ './views/ResponsibilityStatement.vue'),
    }
  ]
})
