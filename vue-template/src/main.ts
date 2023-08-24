import { createApp } from 'vue'

import App from './App.vue'
// 路由配置导入
import { router } from './router/index'
// 饿了么ui导入
import 'element-plus/dist/index.css'

// pinia状态管理
import { createPinia } from 'pinia'

const app = createApp(App)

// 使用路由
app.use(router)

// 使用pinia
const pinia = createPinia()
app.use(pinia)

app.mount('#app')
