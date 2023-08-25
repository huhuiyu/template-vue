<template>
  <el-config-provider :locale="zhCn">
    <RouterView></RouterView>
  </el-config-provider>
</template>

<script setup lang="ts">
import store from './store/index'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import LoginUser from './ts/entity/LoginInfo'

console.log('app启动。。。')
const { updateLoginUser } = store()
updateLoginUser((user: LoginUser) => {
  console.log('登录用户信息：', user)
})
</script>
