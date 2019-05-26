import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/page/navigation_page'
import navigationHead from '@/components/page/navigation_head'
import navigation from '@/components/page/navigation_body'
import carousel from '@/components/page/navigation_carousel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/demo',
      name: 'navigation',
      component: index
    },
    {
      path: '/head',
      name: 'navigation_head',
      component: navigationHead
    },
    {
      path: '/',
      name: 'navigation_real',
      component: navigation
    },
    {
      path: '/car',
      name: 'carousel',
      component: carousel
    }

  ]

})
