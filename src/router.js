import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Case from './views/Case.vue';
import Suggestion from './views/Suggestion.vue';
import CaseAdmin from './views/CaseAdmin.vue';
import SuggestionAdmin from './views/SuggestionAdmin.vue';
import CommunityAdmin from './views/CommunityAdmin.vue';
import Visual from './views/Visual.vue';
import Community from './views/Community.vue';
import Help from './views/Help.vue';
import Admin from './views/Admin.vue';
import ResponsibilityStatement from './views/ResponsibilityStatement.vue';

Vue.use(Router)

export default new Router({
  mode: 'hash',
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
      component: Community,
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
      component: Help,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
    },
    {
      path: '/community_admin',
      name: 'community_admin',
      component: CommunityAdmin,
      redirect: '/community_admin/case_admin',
      children: [
        {
          path: 'case_admin',
          name: 'case_admin',
          component: CaseAdmin
        },
        {
          path: 'suggestion_admin',
          name: 'suggestion_admin',
          component: SuggestionAdmin
        },
        {
          path: 'visual',
          name: 'visual',
          component: Visual
        }
      ]
    },
    {
      path: '/responsibility',
      name: 'responsibility',
      component: ResponsibilityStatement,
    }
  ]
})
