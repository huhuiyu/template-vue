// 分文件路由配置
const routers = [
  {
    path: '/manage/dept',
    component: () => import('../view/manage/Dept.vue'),
  },
]

export default routers
