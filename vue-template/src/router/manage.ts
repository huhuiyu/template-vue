// 分文件路由配置
const routers = [
  {
    path: '/manage/dept',
    component: () => import('../view/manage/Dept.vue'),
  },
  {
    path: '/manage/login',
    component: () => import('../view/manage/Login.vue'),
  },
  {
    path: '/manage/user/main',
    component: () => import('../view/manage/UserMain.vue'),
  },
]

export default routers
