import { createApp } from 'vue'
import App from './App.vue'
// 路由配置导入
import { router } from './router'

// 饿了么ui导入
import 'element-plus/dist/index.css'

const app = createApp(App)

// 使用路由
app.use(router)

app.mount('#app')
