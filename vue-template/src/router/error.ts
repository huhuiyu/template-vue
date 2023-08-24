// 错误页面配置
const routers: any[] = [
  {
    path: '/error404',
    component: () => import('../view/Error404.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/error404',
  },
]

export default routers
