<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import store from '../../store/index'

const title = 'pinia演示一'
const router = useRouter()

const { count } = storeToRefs(store())
const { increment } = store()
</script>

<template>
  <div>
    {{ title }}
  </div>
  <div>
    计数信息：{{ count }}
    <button @click="increment">修改计数</button>
    <button @click="router.push('/basic/piniaother')">跳转页面</button>
  </div>
</template>
