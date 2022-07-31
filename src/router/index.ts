import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import LayoutView from '../views/LayoutView.vue'
import store from '../store/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/layout',
    name: 'layout',
    component: LayoutView,
    redirect: 'home',
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          isShow: true,
          title: '首页',
        },
        component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/404View.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  // console.log('to, from', to, from);
  const isLoadRouters = store.state.asyncRoutesMark
  const token = localStorage.getItem('token')
  const routes = JSON.parse(localStorage.getItem('routes'))
  // 有token routes
  if (to.path == '/login') {
    next()
  } else {
    //用户已登录
    if (token && JSON.stringify(routes) != '[]') {
      if (isLoadRouters) {
        console.log('路由已添加，直接跳转到目标页面')
        next()
      } else {
        //解决刷新页面空白
        console.log('重新加载路由，并跳转到目标页')
        const routes = JSON.parse(localStorage.getItem('routes'))
        store.commit('setRouters', routes)
        store.commit('setAsyncRoutesMark', true)

        //添加路由
        routes.forEach(item => {
          // console.log('遍历', item)
          router.addRoute('layout', {
            path: item.path,
            name: item.name,
            component: () => import(`../views/${item.component}`),
            meta: {
              title: item.meta.title,
              isShow: item.meta.isShow,
            },
          })
        })

        next({ ...to, replace: true })
      }
    } else {
      // console.log('无登录信息，跳转到登录页');
      store.commit('setMenuList', [])
      store.commit('setAsyncRoutesMark', false)
      next(`/login`)
    }
  }
})

export default router
