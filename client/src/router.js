import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home,
    //   children: [
    //     {
    //       path: ':id',
    //       name: 'id',
    //       component: () => import('./views/DetailArticle.vue')
    //     }
    //   ]
    // },
    
    {
      path: '/articles',
      name: 'article',
      component: () => import('./views/Blog.vue'),
    },
    {
      path: '/articles/:id',
      name: 'article/:id',
      component: () => import('./views/DetailBlog.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/aa/:id',
      name: 'aa',
      component: () => import('./views/DetailArticle2.vue')
    },
    {
      path: '/',
      name:'home',
      component: () => import('./views/Home'),
      children: [
        {
          path:'/:id',
          name: 'id',
          component: () => import('./views/DetailBlog')
        }
      ]
    },
  ]
})
