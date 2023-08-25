<script setup lang="ts">
import { storeToRefs } from 'pinia'
import store from '../../store/index'
import { useRouter } from 'vue-router'
import ApiService from '../../ts/ApiService'

const router = useRouter()

const title = '用户首页'
const { loginUser } = storeToRefs(store())

function logout() {
  ApiService.post('/user/auth/logout', {}, () => {
    router.push('/manage/login')
  })
}
</script>

<template>
  <div>
    {{ title }}
  </div>
  <div v-if="loginUser.isLogin">
    <div>
      <span>{{ loginUser.tbUser.username }}({{ loginUser.tbUser.nickname }})-{{ loginUser.tbUserInfo.phone }}</span>
      <button @click="logout">安全退出</button>
    </div>
    <img v-if="loginUser.tbUserInfo.img" :src="loginUser.tbUserInfo.img" alt="" />
    <img v-else src="https://media.huhuiyu.top/huhuiyu.top/hu-logo.jpg" alt="" />
  </div>
  <div v-else>
    <a href="javascript:void(0)" @click="router.push('/manage/login')">请先登录...</a>
  </div>
</template>

<style lang="scss" scoped>
img {
  width: 5rem;
  height: auto;
  display: block;
}
</style>
