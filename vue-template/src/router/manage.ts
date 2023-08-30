// 分文件路由配置
const routers = [
  {
    path: '/manage/dept',
    component: () => import('../view/manage/Dept.vue'),
  },
  {
    path: '/manage/deptinfo',
    component: () => import('../view/manage/DeptInfo.vue'),
  },
  {
    path: '/manage/employee',
    component: () => import('../view/manage/Employee.vue'),
  },
  {
    path: '/manage/login',
    component: () => import('../view/manage/Login.vue'),
  },
  {
    path: '/manage/user/main',
    component: () => import('../view/manage/UserMain.vue'),
  },
  {
    path: '/manage/user/file',
    component: () => import('../view/manage/File.vue'),
  },
  {
    path: '/manage/message',
    component: () => import('../view/manage/Message.vue'),
  },
  {
    path: '/manage/messagedetail/:umid',
    component: () => import('../view/manage/MessageDetail.vue'),
  },
]

export default routers
