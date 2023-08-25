// 嵌套子路由配置
const routers = [
  {
    path: '/basic/router/sub',
    component: () => import('../view/basic/RouterSub.vue'),
    children:[
      {
        path:'one',
        component: () => import('../view/basic/RouterSubOne.vue'),
      }, {
        path:'two',
        component: () => import('../view/basic/RouterSubTwo.vue'),
      },
    ]
  }
]

export default routers
