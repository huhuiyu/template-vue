import sub from './sub'
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
    path: '/basic/routerpath/:id',
    component: () => import('../view/basic/RouterPath.vue'),
  },
  {
    path: '/basic/lifecircle',
    component: () => import('../view/basic/LifeCircle.vue'),
  },
  {
    path: '/basic/method',
    component: () => import('../view/basic/Method.vue'),
  },
  {
    path: '/basic/pinia',
    component: () => import('../view/basic/Pinia.vue'),
  },
  {
    path: '/basic/piniaother',
    component: () => import('../view/basic/PiniaOther.vue'),
  },
].concat(sub)

export default routers
