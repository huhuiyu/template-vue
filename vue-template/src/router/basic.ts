// 分文件路由配置
const routers = [
  {
    path: '/basic/reactive',
    component: () => import('../view/basic/Reactive.vue'),
  },
  {
    path: '/basic/router',
    component: () => import('../view/basic/Router.vue'),
  },
  {
    path: '/basic/routerparam',
    component: () => import('../view/basic/RouterParam.vue'),
  },
  {
    path: '/basic/lifecircle',
    component: () => import('../view/basic/LifeCircle.vue'),
  },
  {
    path: '/basic/method',
    component: () => import('../view/basic/Method.vue'),
  },
]

export default routers
