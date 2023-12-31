import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router'

// 基础知识点路由
import basicRouters from './basic'

// 数据管理演示路由
import manageRouters from './manage'

// 错误路由，最好放置在路由的最后
import errorRouters from './error'

// 测试模块路由
const testRouters: any[] = [
  {
    path: '/test/elementui',
    component: () => import('../view/test/ElementUI.vue'),
  },
  {
    path: '/test/tools',
    component: () => import('../view/test/Tools.vue'),
  },
  {
    path: '/test/ajax',
    component: () => import('../view/test/Ajax.vue'),
  },
]

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../view/Home.vue'),
  },
  {
    path: '/about',
    component: () => import('../view/About.vue'),
  },
]
  .concat(testRouters)
  .concat(basicRouters)
  .concat(manageRouters)
  .concat(errorRouters)

// 创建router
const router = createRouter({
  // 配置为Hash模式
  history: createWebHistory(import.meta.env.BASE_URL),
  // 配置toures
  routes,
  // 路由跳转时返回顶部
  scrollBehavior() {
    return { top: 0 }
  },
})

// 设置前置路由守卫
router.beforeEach((to, from, next) => {
  console.log('路由前置：', to, from)
  next()
})

// 设置后置路由守卫
router.afterEach((to, from, failure) => {
  console.log('路由后置：', to, from, failure)
})

export { router }
