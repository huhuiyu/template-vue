<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const title = '路由功能演示一'
let count = ref(5)
let skiping = ref(false)
let id = ref(1000)
let timer: any

function one() {
  let config = {
    path: '/basic/routerparam',
    query: { name: '黑暗骑士', id: 100 },
  }
  console.log('路由信息：', router.resolve(config))
  router.push(config)
}

function two() {
  router.push('/basic/lifecircle')
}

function three() {
  let config = {
    path: '/basic/routerparam',
  }
  skiping.value = true
  timer = setInterval(() => {
    count.value--
    if (count.value == 0) {
      clearInterval(timer)
      router.push(config)
    }
  }, 1000)
}

function four() {
  router.push(`/basic/routerpath/${id.value}`)
}
</script>

<template>
  <div>
    {{ title }}
  </div>
  <div>
    <a href="javascript:void(0)" @click="one">路由传参演示</a>
    |
    <button @click="two">生命周期</button>
    |
    <a v-if="!skiping" href="javascript:void(0)" @click="three">延时跳转</a>
    <span v-else>还有{{ count }}秒跳转页面</span>
  </div>
  <hr />
  <div>
    <input type="text" v-model="id" />
    <button @click="four">路径参数路由跳转</button>
  </div>
  <hr />
  <div>
    <a href="javascript:void(0)" @click="router.push('/basic/router/sub')">路由嵌套演示-无子路由</a>
    |
    <a href="javascript:void(0)" @click="router.push('/basic/router/sub/one')">路由嵌套演示-子路由一</a>
    |
    <a href="javascript:void(0)" @click="router.push('/basic/router/sub/two')">路由嵌套演示-子路由二</a>
  </div>
</template>
